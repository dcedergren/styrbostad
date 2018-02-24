function boplatssyd_crawl(callback) {
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

    parser.getRobots('https://www.boplatssyd.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/lagenheter')) {
                start_crawl();
            }
            else {
                callback('boplatssyd not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'https://www.boplatssyd.se/lagenheter',
            jQuery: 'cheerio',
            callback: function(error, res, done) {
                if(error){
                    errors.push('Boplats starturl: ' + error);
                }
                var $ = res.$;
                $('#apartment-search-results > div > article > div.object-details > a').each(function(index, a) {
                    try {
                        var object = {};
                        object.title = $(a).text();
                        object.rooms = $(a).next('.apartment-info').find('.rooms').text();
                        object.price = $(a).next('.apartment-info').find('.rent').text();
                        object.square_feet = $(a).next('.apartment-info').find('.size').text();
                        object.city = $(a).find('.municipality').text();
                        object.source = $(a).next('.apartment-info').find('.landlord').text();
                        object.url = url.resolve(res.request.uri.href, $(a).attr('href'));
                        object.adress = $(a).find('.address').text();
                        array.push(object);
                    }
                    catch(error) {
                        errors.push('Boplats get info: ' + error);
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

module.exports.boplatssyd_crawl = boplatssyd_crawl;
