function dios_crawl(callback) {
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

    parser.getRobots('http://www.dios.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/Bostader/Lediga-bostader/')) {
                start_crawl();
            }
            else {
                callback('dios not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'http://www.dios.se/Bostader/Lediga-bostader/',
            jQuery: 'cheerio',
            callback: function(error, res, done) {
                if(error){
                    errors.push('Dios starturl: ' + error);
                }
                var $ = res.$;
                $('#object-list > ul > li > a').each(function(index, a) {
                    try {
                        var toQueueUrl = url.resolve(res.request.uri.href, $(a).attr('href'));
                    }
                    catch(error) {
                        errors.push('Dios url resolve: ' + error);
                        return false;
                    }
                    c.queue([{
                        uri: toQueueUrl,
                        jQuery: 'cheerio',
                        callback : function (error, res, done) {
                            if(error){
                                errors.push('Dios loopUrls: ' + error);
                            }
                            else {
                                try {
                                    var  $= res.$;
                                    var object = {};
                                    object.title = $('#headInfo > h2').text();
                                    object.price = $('#leftContentVitec > table > tr:nth-child(8) > td:nth-child(2) > strong').text();
                                    object.square_feet = $('#leftContentVitec > table > tr:nth-child(4) > td:nth-child(2)').text();
                                    object.rooms = $('#leftContentVitec > table > tbody > tr:nth-child(5) > td:nth-child(2)').text();
                                    object.city = $('#leftContentVitec > table > tr:nth-child(1) > td:nth-child(2)').text();
                                    object.source = 'Diös';
                                    object.url = res.request.uri.href;
                                    object.adress = $('#leftContentVitec > table > tr:nth-child(3) > td:nth-child(2)').text();
                                    array.push(object);
                                }
                                catch(error) {
                                    errors.push('Dios get info: ' + error);
                                }
                            }
                            done();
                        }
                    }]);//inner Queue
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

module.exports.dios_crawl = dios_crawl;
/*var casper = require("casper").create({
    pageSettings: {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36"
    }
});
var fs = require('fs');
var array = [];
var links = [];
var staticUrl = 'http://www.dios.se';
var url = 'http://www.dios.se/Bostader/Lediga-bostader/';
var utils = require('utils');

function getLinks() {
    var links = document.querySelectorAll('#object-list > ul > li > a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}
casper.start(url).viewport(1600,1000);

casper.then(function() {
    links = this.evaluate(getLinks);
    casper.each(links, function (self, link) {
        self.thenOpen(staticUrl + link, function () {
            this.wait(2000,function () {
                var object = {};
                object.title = this.fetchText('#headInfo > h2');
                object.short_description = casper.fetchText('#headInfo > p');
                object.full_description = casper.fetchText('#headInfo > p');
                object.rooms = casper.fetchText('#leftContentVitec > table > tbody > tr:nth-child(5) > td:nth-child(2)');
                object.price = casper.fetchText('#leftContentVitec > table > tbody > tr:nth-child(8) > td:nth-child(2) > strong');
                object.square_feet = casper.fetchText('#leftContentVitec > table > tbody > tr:nth-child(4) > td:nth-child(2)');
                object.city = casper.fetchText('#leftContentVitec > table > tbody > tr:nth-child(1) > td:nth-child(2)');
                //object.images = casper.fetchText(x(''));
                object.url = casper.getCurrentUrl();
                object.adress = casper.fetchText('#leftContentVitec > table > tbody > tr:nth-child(3) > td:nth-child(2)');
                object.source = 'Diös';
                array.push(object);
            });

        });
    });
});
casper.run(function () {
    utils.dump(array);
    this.exit();
});*/

