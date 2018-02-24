function uppsala_Bostadsformedling_crawl(callback) {
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

    parser.getRobots('https://bostad.uppsala.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/lediga-bostader')) {
                start_crawl();
            }
            else {
                callback('Uppsala bostadsförmedling not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'https://bostad.uppsala.se/lediga-bostader/',
            jQuery: 'cheerio',
            callback: function(error, res, done) {
                if(error){
                    errors.push('Uppsala bostadsförmedling starturl: ' + error);
                }
                var $ = res.$;
                let j = 1;
                $('#rental-objects-list > ul > li > div > div.rentalMainInfo > h3 > a').each(function(index, a) {
                    try {
                        let check = $(a).closest('.rentalMainInfo').next('.moreInfo').find('ul > li:nth-child(3)').text().split(':').pop();
                        let substring ='Studentstaden';
                        if(check.indexOf(substring) == -1) {
                            var object = {};
                            object.title = $(a).text();
                            object.rooms = $(a).closest('.rentalMainInfo').find('.description > p').text().split('•').shift();
                            object.price = $(a).closest('.rentalMainInfo').find('.description > p').text().split('•').pop();
                            object.square_feet = $(a).closest('.rentalMainInfo').find('.description > p').text().split('•')[1];
                            object.city = $(a).closest('.rentalMainInfo').find('.location').text().split(',').shift();
                            object.source = $(a).closest('.rentalMainInfo').next('.moreInfo').find('ul > li:nth-child(3)').text().split(':').pop();
                            object.url = url.resolve(res.request.uri.href, $(a).attr('href'));
                            object.adress = $(a).find('.address').text();
                            array.push(object);
                            j++;
                        }
                    }
                    catch(error) {
                        errors.push('Uppsala bostadsförmedling get info: ' + error);
                    }
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

module.exports.uppsala_Bostadsformedling_crawl = uppsala_Bostadsformedling_crawl;