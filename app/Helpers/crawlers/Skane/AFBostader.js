function afbostader_crawl(callback) {
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

    parser.getRobots('https://www.afbostader.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/redimo/rest/vacantproducts')) {
                start_crawl();
            }
            else {
                callback('afbostader not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'https://www.afbostader.se/redimo/rest/vacantproducts?lang=sv_SE&type=1',
            jQuery: false,
            callback: function(error, res, done) {
                if(error){
                    errors.push('AF Bostäder starturl: ' + error);
                }
                else {
                    try {
                        var jsonTempArray = JSON.parse(res.body);
                        var jsonArray = jsonTempArray.product;
                        jsonArray.forEach(function(item) {
                            var object = {};
                            object.title = item.address + ", " + item.city;
                            object.price = item.rent;
                            object.square_feet = item.sqrMtrs;
                            object.city = item.city;
                            object.source = 'AF Bostäder';
                            object.url = 'https://www.afbostader.se/lediga-bostader/bostadsdetalj/?obj=' + item.productId;
                            object.adress = item.address;
                            array.push(object);
                        });
                    }
                    catch(error) {
                        errors.push('AF Bostäder get info: ' + error);
                    }
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

module.exports.afbostader_crawl = afbostader_crawl;
