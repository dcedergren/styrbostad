function balder_crawl(callback) {
    var Crawler = require("crawler");
    var cheerio = require('cheerio');
    var parser = require('../Robots_Parser');
    var url = require('url');
    var staticUrl = 'http://www.balder.se';
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

    parser.getRobots('http://www.balder.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/handler/Objektdata')) {
                start_crawl();
            }
            else {
                callback('balder not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'http://www.balder.se/handler/Objektdata.ashx?typ=Bostad',
            jQuery: false,
            callback: function(error, res, done) {
                if(error){
                    errors.push('Balder starturl: ' + error);
                }
                else {
                    var jsonArray = JSON.parse(res.body);

                    jsonArray.forEach(function(item) {
                        try {
                            var object = {};
                            object.rooms = item.antalrum;
                            object.price = item.hyra;
                            object.square_feet = item.storlek_display;
                            object.city = item.ort;
                            object.source = 'Balder';
                            object.url = staticUrl + item.URL;
                            object.adress = item.adress;
                            array.push(object);
                        }
                        catch (error) {
                            errors.push('Balder get info: ' + error);
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

module.exports.balder_crawl = balder_crawl;