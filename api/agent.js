var request = require('superagent-charset')(require('superagent'))
var iconv = require('iconv-lite')
var cookie = require('./login')

module.exports = function getUrl(url, method) {
  return request[method || 'get'](url)
  .set('cookie',cookie())
  .charset('gbk')  
}