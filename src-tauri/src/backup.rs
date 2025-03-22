use chrono::{DateTime, Local};
use serde::Serialize;
use std::{fs, io, path::Path, time::SystemTime};

#[derive(Debug, Serialize)]
pub struct BackupItem {
    title: String,
    #[serde(rename = "type")]
    item_type: String,
    #[serde(rename = "backupTime")]
    backup_time: String,
    #[serde(rename = "archiveTime")]
    archive_time: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    children: Option<Vec<BackupItem>>,
}

fn format_time(time: SystemTime) -> String {
    let datetime: DateTime<Local> = time.into();
    datetime.format("%Y-%m-%d %H:%M:%S").to_string()
}

fn get_latest_mtime(path: &Path) -> io::Result<SystemTime> {
    let mut latest = SystemTime::UNIX_EPOCH;

    for entry in fs::read_dir(path)? {
        let entry = entry?;
        let path = entry.path();
        let metadata = fs::metadata(&path)?;

        if path.is_dir() {
            let mtime = get_latest_mtime(&path)?;
            if mtime > latest {
                latest = mtime;
            }
        } else {
            let mtime = metadata.modified()?;
            if mtime > latest {
                latest = mtime;
            }
        }
    }

    Ok(latest)
}

fn process_directory(path: &Path) -> io::Result<Option<BackupItem>> {
    if !path.is_dir() {
        return Ok(None);
    }

    let backup_time = fs::metadata(path)?.created()?;
    let archive_time = get_latest_mtime(path)?;
    let mut has_target = false;
    let mut children = Vec::new();

    for entry in fs::read_dir(path)? {
        let entry = entry?;
        let entry_path = entry.path();

        if entry_path.is_dir() {
            let dir_name = entry_path.file_name().unwrap().to_string_lossy();

            if dir_name == "COTW" || dir_name == "theHunter Call of the Wild" {
                has_target = true;
            } else if let Some(child) = process_directory(&entry_path)? {
                children.push(child);
            }
        }
    }

    if has_target {
        Ok(Some(BackupItem {
            title: path.file_name().unwrap().to_string_lossy().into_owned(),
            item_type: "archive".to_string(),
            backup_time: format_time(backup_time),
            archive_time: format_time(archive_time),
            children: None,
        }))
    } else if !children.is_empty() {
        Ok(Some(BackupItem {
            title: path.file_name().unwrap().to_string_lossy().into_owned(),
            item_type: "group".to_string(),
            backup_time: format_time(backup_time),
            archive_time: format_time(archive_time),
            children: Some(children),
        }))
    } else {
        Ok(None)
    }
}

#[tauri::command]
pub async fn get_backup_data() -> Result<Vec<BackupItem>, String> {
    let document_dir = dirs::document_dir().ok_or("无法获取文档目录".to_string())?;
    let backup_path = document_dir.join("Avalanche Studios").join("Backup");
    let mut result = Vec::new();

    if let Ok(entries) = fs::read_dir(backup_path) {
        for entry in entries {
            if let Ok(entry) = entry {
                let path = entry.path();
                if let Ok(Some(item)) = process_directory(&path) {
                    result.push(item);
                }
            }
        }
    }

    Ok(result)
}
