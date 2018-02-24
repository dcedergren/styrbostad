function finfast_crawl(callback) {
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

    parser.getRobots('http://www.finfast.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/lediga-objekt')) {
                start_crawl();
            }
            else {
                callback('finfast not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'http://www.finfast.se/lediga-objekt',
            jQuery: 'cheerio',
            callback: function(error, res, done) {
                if(error){
                    errors.push('Finfast starturl: ' + error);
                }
                var $ = res.$;
                $('#jForm > div.jea-items > dl > dd > a').each(function(index, a) {
                    try {
                        var toQueueUrl = url.resolve(res.request.uri.href, $(a).attr('href'));
                    }
                    catch(error) {
                        errors.push('Finfast url resolve: ' + error);
                        return false;
                    }
                    c.queue([{
                        uri: toQueueUrl,
                        jQuery: 'cheerio',
                        callback : function (error, res, done) {
                            if(error){
                                errors.push('Finfast loopUrls: ' + error);
                            }
                            else {
                                try {
                                    var  $= res.$;
                                    var object = {};
                                    object.title = $('body > div.uk-container.uk-container-center > div.tm-middle.uk-grid > div > main > h1').text();
                                    object.rooms = $('body > div.uk-container.uk-container-center > div.tm-middle.uk-grid > div > main > table:nth-child(11) > tr:nth-child(2) > td').text();
                                    object.price = $('body > div.uk-container.uk-container-center > div.tm-middle.uk-grid > div > main > table:nth-child(9) > tr > td').text();

                                    object.square_feet = $('body > div.uk-container.uk-container-center > div.tm-middle.uk-grid > div > main > table:nth-child(11) > tr:nth-child(1) > td').text();
                                    object.city = 'Örebro';
                                    object.source = 'Finfast';
                                    object.url = res.request.uri.href;
                                    object.adress = $('body > div.uk-container.uk-container-center > div.tm-middle.uk-grid > div > main > div.jea-col-right > address').text();
                                    array.push(object);
                                }
                                catch(error) {
                                    errors.push('Finfast get info: ' + error);
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

module.exports.finfast_crawl = finfast_crawl;