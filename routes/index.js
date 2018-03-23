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
  // 日期
  var days = Object.keys(novels.novel)
  var chapters = Array.isArray(novels.chapters.today) ? novels.chapters[days[0]] : novels.chapters.today
  // 章节ID
  var ids = Object.keys(chapters).sort((a,b)=>b-a)
  console.log(chapters)
  // 章节名
  var names = ids.map(id => chapters[id].name)
  var counts = {}
  ids.forEach(x => {
    counts[x] = days.map((c) => (novels.chapters[c] && novels.chapters[c][x]) ? novels.chapters[c][x].count : 0)
  })
  var obj = {
    title: novels.title,
    headers: ['章节ID','章节名称'].concat(days),
    novel: novels.novel,
    chapters: [
      ids,
      names
    ],
    counts: counts
  }
  //增加汇总
  var tj = (days.map((x,i)=> {
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
