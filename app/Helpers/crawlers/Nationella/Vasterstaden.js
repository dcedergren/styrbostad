function vasterstaden_crawl(callback) {
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

    parser.getRobots('http://www.vasterstaden.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/bostader')) {
                start_crawl();
            }
            else {
                callback('vasterstaden not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'http://www.vasterstaden.se/bostader',
            jQuery: 'cheerio',
            callback: function(error, res, done) {
                if(error){
                    errors.push('Västerstaden starturl: ' + error);
                }
                var $ = res.$;
                $('#block-views-ledig_lgh-block_1 > div > div > div.view-content > table > tbody > tr > td.views-field.views-field-field-lgh-bild-fid > a').each(function(index, a) {
                    try {
                        var object = {};
                        object.rooms = $(a).closest('tr').find('.views-field-field-lgh-rum-value').text();
                        object.price = $(a).closest('tr').find('.views-field-field-lgh-hyra-value').text();
                        object.square_feet = $(a).closest('tr').find('.views-field-field-lgh-yta-value').text();
                        object.city = $(a).closest('tr').find('.views-field-field-lgh-ort-nid').text();
                        object.source = 'Västerstaden';
                        object.title = $(a).closest('tr').find('.views-field-field-lgh-adress-value').text();
                        object.url = url.resolve(res.request.uri.href, $(a).attr('href'));
                        object.adress = $(a).closest('tr').find('.views-field-field-lgh-adress-value').text();
                        array.push(object);
                    }
                    catch(error) {
                        errors.push('Västerstaden get info: ' + error);
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

module.exports.vasterstaden_crawl = vasterstaden_crawl;