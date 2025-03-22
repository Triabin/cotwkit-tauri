// 自定义插件，用于在类上定义一些定制化的函数
export default {
  install(app) {
    /**
     * 函数描述：时间格式化工具
     * @param format {String} 格式（y-年，M-月，d-日，H-时[24]，h-时[12]，m-分，s-秒，S-毫秒(3位数)，q-季度，ap，午前am/午后pm）
     * @returns {String}
     */
    Date.prototype.$format = function(format = 'yyyy-MM-dd HH:mm:ss') {
      let o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'H+': this.getHours(), // 时（24小时制）
        'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 时（12小时制）
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds(), // 毫秒
        'ap': this.getHours() > 12 ? 'am' : 'pm'
      };
      let week = ['日', '一', '二', '三', '四', '五', '六'];
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[this.getDay()]);
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
      return format;
    };
  }
};
