export const LANG = {
  zhCN: {
    value: 'zh-CN',
    i18nValue: 'zh'
  },
  enUS: {
    value: 'en-US',
    i18nValue: 'en'
  },
  i18nFromValue: (value) => {
    let keys = Object.keys(this);
    for (const key in keys) {
      let el = this[key];
      if (typeof el === 'function') continue;
      if (el?.value === value) return el.i18nValue;
    }
  }
}
