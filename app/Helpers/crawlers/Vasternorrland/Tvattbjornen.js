function tvattbjornen_crawl(callback) {
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

    parser.getRobots('https://www.tvattbjornen.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/bostader/')) {
                if(parser.canFetchSync(userAgent, '/fastigheter/')) {
                    start_crawl();
                }
                else {
                    callback('tvattbjornen not allowed');
                }
            }
            else {
                callback('tvattbjornen not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'https://www.tvattbjornen.se/bostader/',
            jQuery: 'cheerio',
            callback: function(error, res, done) {
                if(error){
                    errors.push('Tvättbjörnen starturl: ' + error);
                }
                var $ = res.$;
                $('#post-4126 > div > div > div > div > div > div > ul > li > a').each(function(index, a) {
                    try {
                        var toQueueUrl = url.resolve(res.request.uri.href, $(a).attr('href'));
                    }
                    catch(error) {
                        errors.push('Tvättbjörnen url resolve: ' + error);
                        return false;
                    }
                    c.queue([{
                        uri: toQueueUrl,
                        jQuery: 'cheerio',
                        callback : function (error, res, done) {
                            if(error){
                                errors.push('Tvättbjörnen loopUrls: ' + error);
                            }
                            else {
                                try {
                                    var  $= res.$;
                                    var object = {};
                                    object.title = $('#content > div > div > h1').text();
                                    object.price = $('#content > div > div > div > table > tr:nth-child(5) > td > p').text();
                                    object.square_feet = $('#content > div > div > div > table > tr:nth-child(4) > td > p').text().split(',').pop();
                                    object.rooms = $('#content > div > div > div > table > tr:nth-child(4) > td > p').text().split(',').shift();
                                    object.city = $('#content > div > div > h1').text().split(',').shift();
                                    if(object.city.indexOf('City') >= 0){
                                        object.city = 'Sundsvall';
                                    }
                                    object.source = 'Tvättbjörnen';
                                    object.url = res.request.uri.href;
                                    object.adress = $('#content > div > div > div > table > tr:nth-child(2) > td > p').text();
                                    array.push(object);
                                }
                                catch(error) {
                                    errors.push('Tvättbjörnen get info: ' + error);
                                }
                            }
                            done();
                        }
                    }]);
                });
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

module.exports.tvattbjornen_crawl = tvattbjornen_crawl;


