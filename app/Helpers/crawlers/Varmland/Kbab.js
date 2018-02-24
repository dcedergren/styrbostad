function kbab_crawl(callback) {
    var Crawler = require("crawler");
    var cheerio = require('cheerio');
    var parser = require('../Robots_Parser');
    var url = require('url');
    var array = [];
    var errors = [];
    var userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36';
    var setCrawlDelay = 2500;
    var c = new Crawler({
        retries: 1,
        retryTimeout: 2500,
        rateLimit: setCrawlDelay,
        userAgent: userAgent,
    });

    parser.getRobots('https://www.kbab.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/hyr-av-oss/lediga-lagenheter')) {
                start_crawl();
            }
            else {
                callback('kbab not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'https://www.kbab.se/hyr-av-oss/lediga-lagenheter?type=L&type=S&minsize=1%7C1&maxsize=s10%7C32000&minarea=0&maxarea=2147483647&minrent=0&maxrent=2147483647&search=1&v=2',
            jQuery: 'cheerio',
            callback: function(error, res, done) {
                if(error){
                    errors.push('Kbab starturl: ' + error);
                }
                else {
                    var $ = res.$;
                    $('#apartmentlist > div > a').each(function(index, a) {
                        try {
                            let object = {};
                            let counter = index + 2;
                            object.title = $('#apartmentlist > div:nth-child(' + counter +') > a > h3').text();
                            object.rooms = $('#apartmentlist > div:nth-child(' + counter +') > a > p:nth-child(4)').text();
                            object.price = $('#apartmentlist > div:nth-child(' + counter +') > a > p:nth-child(5)').text();
                            object.square_feet = $('#apartmentlist > div:nth-child(' + counter +') > a > p:nth-child(6)').text();
                            object.city = 'Karlstad';
                            object.source = 'Kbab';
                            object.url = url.resolve(res.request.uri.href, $(a).attr('href'));
                            object.adress = $('#apartmentlist > div:nth-child(' + counter +') > a > h3').text();
                            array.push(object);
                        }
                        catch(error) {
                            errors.push('Kbab get info: ' + error);
                        }
                    });
                }
                done();
            }
        }]);
        c.on('drain',function(){
            if(errors.length > 0) {
                callback(errors, null);
            }
            else {
                callback(null, array);
            }
        });
    }
}

module.exports.kbab_crawl = kbab_crawl;