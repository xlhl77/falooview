var cheerio = require('cheerio')
var request = require('superagent-charset')(require('superagent'))


function getCLUrl () {
  return request.post('http://get.xunfs.com/app/listapp.php')
  .type('form')
  .send({
    a: 'get',
    system: 'andriod',
    v: 1.5
  })
}

function redirect (req, res) {
  getCLUrl().then(result => {
    res.set(result.header)
    var $ = cheerio.load(result.text)
    var url = $('#main').text()
    res.redirect('http://' + url)
  })
}

module.exports = redirect