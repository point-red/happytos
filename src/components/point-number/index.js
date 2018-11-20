export default {
  install: (Vue) => {
    let number = require('numeral')
    Vue.filter('numberFormat', function (value) {
      return number(value).format('0,0.[00]')
    })
  }
}