function storsjoforvaltning_crawl(callback) {
    var Crawler = require("crawler");
    var cheerio = require('cheerio');
    var robots = require('../Robots_Parser');
    var url = require('url');
    var array = [];
    var errors = [];
    var userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36';
    var c = new Crawler({
        retries: 1,
        retryTimeout: 2500,
        rateLimit: 2500,
        userAgent: userAgent,
    });


    robots.getRobots('http://xn--storsjfrvaltning-rwbb.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/lediga_lokaler_lagenheter')) {
                if(parser.canFetchSync(userAgent, '/lediga_lokaler_lagenheter/lagenheter/')) {
                    start_crawl();
                }
                else {
                    callback('Storsjo not allowed');
                }
            }
            else {
                callback('Storsjo not allowed');
            }
        }
    });


    function start_crawl() {
        c.queue({
            uri: 'http://xn--storsjfrvaltning-rwbb.se/lediga_lokaler_lagenheter',
            jQuery: 'cheerio',
            callback: function(error, res, done) {
                if(error){
                    errors.push('Storsjo starturl: ' + error);
                }
                var $ = res.$;
                $('#showApartmentContainer > div > a').each(function(index, a) {
                    try {
                        var toQueueUrl = url.resolve(res.request.uri.href, $(a).attr('href'));
                    }
                    catch(error) {
                        errors.push('Storsjo url resolve: ' + error);
                        return false;
                    }
                    c.queue([{
                        uri: toQueueUrl,
                        jQuery: 'cheerio',
                        callback : function (error, res, done) {
                            if(error){
                                errors.push('Storsjo loopUrls: ' + error);
                            }
                            else {
                                try {
                                    var  $= res.$;
                                    var object = {};
                                    object.title = $('.mainContent > .noPaddingLeft > h2').text();
                                    object.price = $('.mainContent > .noPaddingLeft > h4:nth-child(3)').text();
                                    var roomSqr = $('.mainContent > .noPaddingLeft > h2').text();
                                    var numberPattern = /\d+/g;
                                    roomSqr = roomSqr.match( numberPattern );
                                    object.square_feet = roomSqr.pop();
                                    object.rooms = roomSqr.shift();
                                    object.city = 'Östersund';
                                    object.source = 'Storsjöförvaltning';
                                    object.url = res.request.uri.href;
                                    object.adress = $('.mainContent > .noPaddingLeft > h4:nth-child(2)').text();
                                    array.push(object);
                                }
                                catch(error) {
                                    errors.push('Storsjo get info: ' + error);
                                }
                            }
                            done();
                        }
                    }]);
                });
                done();
            }
        });

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

module.exports.storsjoforvaltning_crawl = storsjoforvaltning_crawl;
