/**
 * 自动注册飞卢账号
 */

var request = require('superagent')
var cheerio = require('cheerio')

//  request
//  .post('https://u.faloo.com/regist/login.aspx')
//  .send(new FormData())
//  .then(res => {
//    $ = cheerio.load(res.text)
//    console.log($('#hideRandomNum').val())
//  })

// var fs        = require('fs');
// var tesseract = require('node-tesseract');
// var gm        = require('gm');

// processImg('1.jpg', 'test_1.jpg')
//     .then(recognizer)
//     .then(text => {
//         console.log(`识别结果:${text}`);
//     })
//     .catch((err)=> {
//         console.error(`识别失败:${err}`);
//     });
// var agent = request.agent()
// request.get('http://u.faloo.com/Common/ValidateImage.aspx?u=&height=36&width=106&m=0.5566967489450235')
// .buffer(true)
// .then(res => {
//   // res.buffer(true)
//   console.log(res.header)
// })
/**
 * 处理图片为阈值图片
 * @param imgPath
 * @param newPath
 * @param [thresholdVal=55] 默认阈值
 * @returns {Promise}
 */
// function processImg (imgPath, newPath, thresholdVal) {
//     return new Promise((resolve, reject) => {
//         gm(imgPath)
//             .threshold(thresholdVal || 55)
//             .write(newPath, (err)=> {
//                 if (err) return reject(err);

//                 resolve(newPath);
//             });
//     });
// }

// /**
//  * 识别图片
//  * @param imgPath
//  * @param options tesseract options
//  * @returns {Promise}
//  */
// function recognizer (imgPath, options) {
//     options = Object.assign({psm: 7}, options);

//     return new Promise((resolve, reject) => {
//         tesseract
//             .process(imgPath, options, (err, text) => {
//                 if (err) return reject(err);
//                 resolve(text.replace(/[\r\n\s]/gm, ''));
//             });
//     });
// }

module.exports = function login() {
return 'UU12345678=uuc=131570317744128494; last_novel10=472061; last_node10=49; curr_url=https%3A//b.faloo.com/authorlogin.aspx; curr_url4wap=https%3A//wap.faloo.com/; host4chongzhi=b.faloo.com; ASP.NET_SessionId=zdvndy55eymvita0vyxpewu5; verify_code=E957DE75835EEAAA4318C81638EE002E; KeenFire=UserID=xlhl77&Pwd=959c6ad06de50bab7da54250493d6eda&NickName=%e5%82%bb%e7%99%bd%e7%94%9c&Identity=43189.2792250694'
}