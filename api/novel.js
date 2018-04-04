/**
 * 自动注册飞卢账号
 */
var cheerio = require('cheerio')
var agent = require('./agent')

var url = 'https://pay.faloo.com/account/ListBuyChapterCount4Author.aspx?id=472061&type=4&Page='
var arr = {}

 function getChapter(obj, page, count) {
    page = page || 1
    return agent(url + page)
    .then(res => {
      $ = cheerio.load(res.text)
      if (page===1) {
        count = getPages($)
      }

      return getChapterData($, obj)
    })
    .then(() => {
      if (page < count) {
        ++page
        return new Promise((resolve,reject)=>{
          setTimeout(resolve,6000)
        }).then(()=> {return getChapter(obj, page, count)})
      }
    })
 }

function getPages(ele) {
  var pages = ele('#PageListBTop>tbody>tr>td>font>a').length - 1
  return pages
}

function getChapterData(ele, arr) {
      var chapter = ele('#DgArticle>tbody>tr').slice(1)
      chapter.each((i,row) => {
        var c = $(row).children('td')
        var obj = {
          id: Number(c.eq(0).text()),
          name: c.eq(1).text(),
          count: Number(c.eq(3).text())
        }
        arr[obj.id] = obj
      })  
}

function getNovel(id) {
  var obj = {
    novel: {},
    chapter: {}
  }
  if (!id) return
 return agent('https://author.faloo.com/AuthorSelectNovel.aspx?id=' + id)
 .then(res => {
   $ = cheerio.load(res.text)
   var novel = $('#DgArticle>tbody>tr').last().children().toArray()
   var exp = /(\d+)\<br\>(\d+)/
   var sc = exp.exec($(novel[2]).html())
   obj.novel = {
     SC: Number(sc[1]),
     VS: Number(sc[2]),
     FLOWER: Number($(novel[3]).text()),
     RQ: Number($(novel[4]).text())
   }
   return getChapter(obj.chapter)
 }).then(() => obj)
}

var sqliteDB = require('./sqliteDB')

var dbFile = './data/472061.db'
var db = new sqliteDB({
  databaseFile: dbFile
})

function prepareDB(path) {
  db.databaseFile = path
  return db.connectDatabase()
  .then((msg) => {
    // 创建表
    var sql = `
    create table if not exists chapters (
      id integer,
      name varchar(60),
      rq integer,
      cnt integer
    );
    `
    return db.createTable(sql)
  })
}

function saveNovel(data) {
  var rq = formatDate()
  var sql = 'insert into chapters (id, name , rq, cnt) values (?,?,?,?);'
  var p = ['RQ','SC','FLOWER','VS'].map(v => {
    return db.sql(sql,[0,v,rq,data[v]])
  })
  return Promise.all(p).then(()=>{})
}

function saveChapter(data) {
  var rq = formatDate()
  var sql = 'insert into chapters (id, name , rq, cnt) values (?,?,?,?);'
  var p = Object.keys(data).map(v => {
    return db.sql(sql,[v,data[v].name,rq,data[v].count])
  })
  return Promise.all(p).then(()=>{})
}

function save(data) {
  var rq = '' + formatDate()
  if (novels) {
    novels.novel[rq] = data.novel
    novels.chapters[rq] = data.chapter
  }
  
  prepareDB(dbFile)
  .then(() => saveNovel(data.novel))
  .then(() => saveChapter(data.chapter))
}

function query() {
  var sql ='select id ,name, rq, cnt from chapters where rq >= ?;'
  return prepareDB(dbFile)
  .then(() => {
    return db.sql(sql, '' + formatDate(-7), 'all')
  })
  .then(result => {
    //处理数据
    if (Array.isArray(result)) {
      //novel的相关指标
      var n = {}
      result.filter(x => x.id === 0).forEach(x => {
        if (!n[x.rq]) n[x.rq] ={}
        n[x.rq][x.name] = x.cnt
      })

      var c = {}
      result.filter(x => x.id > 0).forEach(x => {
        if (!c[x.rq]) c[x.rq] = {}
        c[x.rq]['' + x.id] = {
          id: x.id,
          name: x.name,
          count: x.cnt
        }
      })
      return {
        novel: n,
        chapter: c
      }
    } 

  })
}

function formatDate (days) {
  var dt = new Date()
  if (days) dt.setDate(dt.getDate() + days)
  var str = dt.getFullYear() + ('0' + (dt.getMonth() + 1)).slice(-2) + ('0' + dt.getDate()).slice(-2)
  return parseInt(str)
}

module.exports = {
  get: getNovel,
  query: query,
  save: save
}