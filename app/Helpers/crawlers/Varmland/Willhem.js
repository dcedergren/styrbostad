function willhem_crawl(callback) {
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

    parser.getRobots('https://www.willhem.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/sok-bostad/')) {
                start_crawl();
            }
            else {
                callback('willhem not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'https://www.willhem.se/sok-bostad/',
            jQuery: 'cheerio',
            callback: function (error, res, done) {
                if (error) {
                    errors.push('Storsjo starturl: ' + error);
                }
                var $ = res.$;
                $('#main_content > article > section > div.col-md-9.col-sm-12.col-xs-12 > div > div > a').each(function (index, a) {
                    try {
                        var toQueueUrlCity = url.resolve(res.request.uri.href, $(a).attr('href'));
                    }
                    catch (error) {
                        errors.push('Willhem url resolve: ' + error);
                        return false;
                    }
                    c.queue([{
                        uri: toQueueUrlCity,
                        jQuery: 'cheerio',
                        callback: function (error, res, done) {
                            if (error) {
                                errors.push('Willhem url resolve stad: ' + error);
                            }
                            else {
                                var $ = res.$;
                                $('#main_content > article > section > div.mRegionContainer > section > table > tbody > tr > td:nth-child(2) > p:nth-child(3) > a').each(function (index, a) {
                                    try {
                                        var object = {};
                                        object.title = $(a).closest('tr').find('[data-title="Adress"]').text();
                                        object.rooms = $(a).closest('tr').find('[data-title="Yta, antal rum"]').text();
                                        object.rooms = object.rooms.split(',').pop();
                                        object.price = $(a).closest('tr').find('[data-title="Hyra"]').text();
                                        object.square_feet = $(a).closest('tr').find('[data-title="Yta, antal rum"]').text();
                                        object.square_feet = object.square_feet.split(',').shift();
                                        object.city = $('#main_content > article > div').text().split('<').pop();
                                        object.url = url.resolve(res.request.uri.href, $(a).attr('href'));
                                        object.adress = $(a).closest('tr').find('[data-title="Adress"]').text();
                                        object.source = 'Willhem';
                                        array.push(object);
                                    }
                                    catch (error) {
                                        errors.push('Willhem get info: ' + error);
                                    }
                                });
                            }
                            done();
                        }
                    }]);
                });
                done();
            }
        }]);
        c.on('drain', function () {
            if (errors.length > 0) {
                callback(errors, null);
            }
            else {
                callback(null, array);
            }
        });
    }
}

module.exports.willhem_crawl = willhem_crawl;










/*

function start(crawlDelay, callback) {
    var Crawler = require("crawler");
    var cheerio = require('cheerio');
    var cheerioAdv = require('cheerio-advanced-selectors');
    var url = require('url');
    var array = [];
    var errors = [];
    var c = new Crawler({
        retries: 1,
        retryTimeout: 2500,
        rateLimit: crawlDelay,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36",
    });

    c.queue([{
        uri: 'https://www.willhem.se/sok-bostad/',
        jQuery: 'cheerio',
        callback: function(error, res, done) {
            if(error){
                errors.push('Storsjo starturl: ' + error);
            }
            var $ = res.$;
            $('#main_content > article > section > div.col-md-9.col-sm-12.col-xs-12 > div > div > a').each(function(index, a) {
                try {
                    var toQueueUrlCity = url.resolve(res.request.uri.href, $(a).attr('href'));
                }
                catch(error) {
                    errors.push('Willhem url resolve: ' + error);
                    return false;
                }
                c.queue([{
                    uri: toQueueUrlCity,
                    jQuery: 'cheerio',
                    callback : function (error, res, done) {
                        if(error){
                            errors.push('Willhem url resolve stad: ' + error);
                        }
                        var $ = res.$;
                        $('#main_content > article > section > div.mRegionContainer > section > table > tbody > tr > td:nth-child(2) > p:nth-child(3) > a').each(function(index, a) {
                            try {
                                var apartmentUrl = url.resolve(res.request.uri.href, $(a).attr('href'));
                                var $ = res.$;
                                var object = {};
                                object.title = cheerioAdv.find($, '#main_content .presentation:eq(0) h2:first').text();
                                object.rooms = cheerioAdv.find($, '#main_content .presentation:eq(0) p:eq(1)').text();
                                object.rooms = object.rooms.split(',').pop();
                                object.price = cheerioAdv.find($, '#main_content .presentation:eq(0) p:first').text();
                                object.square_feet = cheerioAdv.find($, '#main_content .presentation:eq(0) p:eq(1)').text();
                                object.square_feet = object.square_feet.split(',').shift();
                                object.city = cheerioAdv.find($, '#main_content .breadcrumb:eq(0) a:eq(2)').text();
                                object.url = apartmentUrl;
                                object.adress = cheerioAdv.find($, '#main_content h1:first').text();
                                object.source = 'Willhem';
                                array.push(object);
                            }
                            catch(error) {
                                errors.push('Willhem get info: ' + error);
                                return false;
                            }
                            /!*c.queue([{
                             uri: toQueueUrlApartment,
                             callback : function (error, res, done) {
                             if(error){
                             errors.push('Willhem loopUrls: ' + error);
                             }
                             else {
                             try {
                             var $ = res.$;
                             var object = {};
                             object.title = cheerioAdv.find($, '#main_content .presentation:eq(0) h2:first').text();
                             object.rooms = cheerioAdv.find($, '#main_content .presentation:eq(0) p:eq(1)').text();
                             object.rooms = object.rooms.split(',').pop();
                             object.price = cheerioAdv.find($, '#main_content .presentation:eq(0) p:first').text();
                             object.square_feet = cheerioAdv.find($, '#main_content .presentation:eq(0) p:eq(1)').text();
                             object.square_feet = object.square_feet.split(',').shift();
                             object.city = cheerioAdv.find($, '#main_content .breadcrumb:eq(0) a:eq(2)').text();
                             object.url = res.request.uri.href;
                             object.adress = cheerioAdv.find($, '#main_content h1:first').text();
                             object.source = 'Willhem';
                             array.push(object);
                             }
                             catch(error) {
                             errors.push('Willhem get info: ' + error);
                             }
                             }
                             done();
                             }//Callback apartment
                             }]);//Queue apartment*!/

                        });//Loop apartment
                        done();
                    }//Callback City
                }]);//Queue City

            });//Loop Ciity
            done();
        }//Callback mainpage
    }]);//Outer queueu

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
module.exports.willhem_crawl = willhem_crawl;*/
