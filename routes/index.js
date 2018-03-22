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
  var chapters = novels.chapters.today
  var ids = Object.keys(chapters).sort((a,b)=>b-a)
  var counts = {}
  ids.forEach(x => {
    counts[x] = cols.map((c) => novels.chapters[c][x] ? novels.chapters[c][x].count : 0)
  })
  var obj = {
    title: novels.title,
    headers: ['章节ID','章节名称'].concat(cols),
    novel: novels.novel,
    chapters: [
      ids,
      ids.map(x => chapters[x].name),
    ],
    counts: counts
  }
  //增加汇总
  // if (!obj.counts['100000']) {
  //   obj.chapters[0].push(100000)
  //   obj.chapters[1].push('汇总')
  // }
  // obj.counts['100000'] = (cols.map((x,i)=> {
  //   var v = 0
  //   for (var y = 0; y= ids.length - 1; y++) {
  //     v += counts[y][i]
  //   }
  //   return v
  // }))
  return obj
}
module.exports = router;