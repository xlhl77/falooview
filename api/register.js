/**
 * 自动注册飞卢账号
 */

var request = require('superagent')
var cheerio = require('cheerio')

 request
 .get('http://u.faloo.com/regist/Register.aspx')
 .then(res => {
   $ = cheerio.load(res.text)
   console.log($('#hideRandomNum').val())
 })

//  verify_code=76006C2B9261A6CE577EB0ED5E26DB0D; domain=.faloo.com; expires=Tue, 09-Jan-2018 13:35:19 GMT; path=/