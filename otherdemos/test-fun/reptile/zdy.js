var http = require('https'); // https 网路
var cheerio = require('cheerio'); // html 解析
var fs = require("fs"); // 流

// 查询的网址
var queryHref = "https://www.underarmour.cn/sys/navigation/loading?searchWord=&cf=&qf=&nav=203&sortStr=&pf=&pageNumber=1";

var querySearch = 1;

// url列表
var urls = [];
// 出错次数
var errNum = 0;

var flag = true;

// 时间戳格式化
Date.prototype.format = function(fmt) {
     var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt;
}

/**
 * 传入url和搜索页数
 * @param {String}  href 传入的网址
 * @param {int}  serach url传参页数
 */
function getHtml(href, serach) {
    var pageData = "";
    var req = http.get(href, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            pageData += chunk;
        });

        res.on('end', function() {
            $ = cheerio.load(pageData);
            var html = $(".list-item .pro-img-in a .img-face");
            for (var i = 0; i < html.length; i++) {
                urls.push(html[i].attribs['lazy-src']);
            }
            downImg(urls.shift());

        });
    });
}

/**
 * 下载图片
 * @param {String} imgurl：图片地址
 */
function downImg(imgurl) {
    var solveUrl = imgurl;
    // 如果没有前缀则加上https
    if( !(imgurl.indexOf('https') > -1)){
        solveUrl = "https:" + imgurl;
    }
	var narr = solveUrl.replace("https://", "").split("/")
	// 做一步优化，如果存在文件，则不下载
    var randNum = Math.pow(10,8)*Math.random();
    var dateNum = new Date().format("MM-dd");
	var filename = "./upload/etsl/" + narr[0] + "_" + dateNum + randNum;
    http.get(solveUrl,function (res) {
        var imgData = '';
        res.setEncoding('binary');
        res.on('data',function (singleData) {
            imgData += singleData;
        })
        res.on('end',function () {
            var savePath = filename;
            if(savePath.indexOf('.jpg') || savePath.indexOf('.png')){
                savePath += '.jpg'
            }
            fs.writeFile(savePath,imgData,'binary',function (err) {
                if(err){
                    errNum ++;
                    console.log('err:' + errNum);
                    if(urls.length > 0){
                        downImg(urls.shift());
                    }
                    // 只让错误打印一次
                    if(flag){
                        flag = false;
                        console.log(err);
                    }
                }else{
                    if(urls.length > 0){
                        downImg(urls.shift());
                        console.log( 'left:' + urls.length );
                    }
                }
            })
        })
    })
}

getHtml(queryHref, querySearch)