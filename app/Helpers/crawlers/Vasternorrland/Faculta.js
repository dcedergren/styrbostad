function faculta_crawl(callback) {
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

    parser.getRobots('http://faculta.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/lediga-lagenheter/')) {
                if(parser.canFetchSync(userAgent, '/portfolios/')) {
                    start_crawl();
                }
                else {
                    callback('faculta not allowed');
                }
            }
            else {
                callback('faculta not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'http://faculta.se/lediga-lagenheter/',
            jQuery: 'cheerio',
            callback: function (error, res, done) {
                if (error) {
                    errors.push('Faculta Fastigheter starturl: ' + error);
                }
                var $ = res.$;
                $('#post-32 > div > div.isotope.col3.clearfix > div.item > div > div.item-image > a.item-icon.item-view-project-icon').each(function (index, a) {
                    try {
                        var toQueueUrl = url.resolve(res.request.uri.href, $(a).attr('href'));
                    }
                    catch (error) {
                        errors.push('Faculta Fastigheter url resolve: ' + error);
                        return false;
                    }
                    c.queue([{
                        uri: toQueueUrl,
                        jQuery: 'cheerio',
                        callback: function (error, res, done) {
                            if (error) {
                                errors.push('Faculta Fastigheter loopUrls: ' + error);
                            }
                            else {
                                try {
                                    var $ = res.$;
                                    let check = $('#page-title > div > div > div > span.current').text().split(',').shift();
                                    if (check !== 'P-plats') {
                                        var object = {};
                                        object.title = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text();
                                        object.price = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(6) > td:nth-child(2)').text();
                                        object.square_feet = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(4) > td:nth-child(2)').text();
                                        object.rooms = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(5) > td:nth-child(2)').text();
                                        object.city = 'Sundsvall';
                                        object.source = 'Faculta Fastigheter';
                                        object.url = res.request.uri.href;
                                        object.adress = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text();
                                        array.push(object);
                                    }
                                }
                                catch (error) {
                                    errors.push('Faculta Fastigheter get info: ' + error);
                                }
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

module.exports.faculta_crawl = faculta_crawl;




/*

function faculta_crawl(callback) {
    let robots = require('robots'), parser = new robots.RobotsParser();

    function getRobots(callback) {
        let setCrawlDelay = 2500;
        parser.setUrl('https://www.willhem.se', function(parser, success) {
            if(success) {
                let crawlDelay = parser.getCrawlDelay("*");
                if(crawlDelay) {
                    setCrawlDelay = crawlDelay;
                }
                crawl(setCrawlDelay, function(err, result) {
                    callback(err, result);
                });
            }
            else {
                callback('Faculta/robots.txt no connection', null);
            }
        });
    }

    function crawl(crawlDelay, callback) {
        var Crawler = require("crawler");
        var cheerio = require('cheerio');
        var url = require('url');
        var array = [];
        var errors = [];
        var c = new Crawler({
            retries: 1,
            retryTimeout: 2500,
            rateLimit: crawlDelay,
        });

        if(parser.canFetchSync('*', 'http://faculta.se/lediga-lagenheter/')) {
            c.queue([{
                uri: 'http://faculta.se/lediga-lagenheter/',
                jQuery: 'cheerio',
                callback: function (error, res, done) {
                    if (error) {
                        errors.push('Faculta Fastigheter starturl: ' + error);
                    }
                    var $ = res.$;
                    $('#post-32 > div > div.isotope.col3.clearfix > div.item > div > div.item-image > a.item-icon.item-view-project-icon').each(function (index, a) {
                        try {
                            var toQueueUrl = url.resolve(res.request.uri.href, $(a).attr('href'));
                        }
                        catch (error) {
                            errors.push('Faculta Fastigheter url resolve: ' + error);
                            return false;
                        }
                        if(parser.canFetchSync('*', toQueueUrl)) {
                            c.queue([{
                                uri: toQueueUrl,
                                jQuery: 'cheerio',
                                callback: function (error, res, done) {
                                    if (error) {
                                        errors.push('Faculta Fastigheter loopUrls: ' + error);
                                    }
                                    else {
                                        try {
                                            var $ = res.$;
                                            let check = $('#page-title > div > div > div > span.current').text().split(',').shift();
                                            if (check !== 'P-plats') {
                                                var object = {};
                                                object.title = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text();
                                                object.price = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(6) > td:nth-child(2)').text();
                                                object.square_feet = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(4) > td:nth-child(2)').text();
                                                object.rooms = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(5) > td:nth-child(2)').text();
                                                object.city = 'Sundsvall';
                                                object.source = 'Faculta Fastigheter';
                                                object.url = res.request.uri.href;
                                                object.adress = $('#main > div.half.row > div.portfolio-content.span5 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text();
                                                array.push(object);
                                            }
                                        }
                                        catch (error) {
                                            errors.push('Faculta Fastigheter get info: ' + error);
                                        }
                                    }
                                    done();
                                }
                            }]);//inner Queue
                        }
                        else {
                            errors.push('faculta not allowed apartment');
                        }
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
        else {
            callback('Faculta not allowed');
        }
    }
    getRobots(callback);
}

module.exports.faculta_crawl = faculta_crawl;


*/
