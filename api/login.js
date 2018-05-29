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
return 'UU12345678=uuc=131570317744128494; last_novel10=472061; last_node10=49; curr_url=https%3A//b.faloo.com/; host4chongzhi=b.faloo.com; KeenFire=UserID=xlhl77&Pwd=ea19ee5d15f8b65b08960778c5e14047&NickName=%e5%82%bb%e7%99%bd%e7%94%9c&Identity=web43249.7888995255; ASP.NET_SessionId=zdvndy55eymvita0vyxpewu5; verify_code=68D42F05F194A025B9577EC23CCC2165'
}