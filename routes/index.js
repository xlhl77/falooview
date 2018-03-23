var express = require('express');
var router = express.Router();
var fetcher = require('../api/novel')
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render(
    'index',
    retrieve());
});

function retrieve () {
  var dt = new Date().valueOf()
  if (!novels.ing && (dt - novels.lasttime >= 6000000)) {
    novels.ing = true
    fetcher.get(472061)
    .then(function (data) {
      novels.ing = false
      novels.novel.today = data.novel
      novels.chapters.today = data.chapter
      novels.lasttime = new Date().valueOf()
    })
  }
  return processData()
}

function processData () {
  var cols = Object.keys(novels.novel)
  var chapters = novels.chapters
  var ids = Object.keys(chapters).sort((a,b)=>b-a)
  var counts = {}
  ids.forEach(x => {
    counts[x] = cols.map((c) => (novels.chapters[c] && novels.chapters[c][x]) ? novels.chapters[c][x].count : 0)
  })
  var obj = {
    title: novels.title,
    headers: ['章节ID','章节名称'].concat(cols),
    novel: novels.novel,
    chapters: [
      ids,
      Array.isArray(chapters.today) ? ids.map(x => chapters[cols[0]][x].name): ids.map(x => chapters.today[x].name),
    ],
    counts: counts
  }
  //增加汇总
  var tj = (cols.map((x,i)=> {
    var v = 0
    ids.forEach(y => {
      v += counts[y] ? counts[y][i] : 0
    })
    return v
  }))
  if (!counts['-']) {
    obj.chapters[1].unshift('共'+ ids.length + '章')
    obj.chapters[0].unshift('-')
    counts['-'] = tj
  }  
  return obj
}
module.exports = router;
