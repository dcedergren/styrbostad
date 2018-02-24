function stangastaden_crawl(callback) {
    var array = [];
    var Crawler = require("crawler");
    var cheerio = require('cheerio');
    var url = require('url');
    var errors = [];
    var c = new Crawler({
        retries: 1,
        retryTimeout: 2500,
        rateLimit: 2500,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36",
    });

    c.queue({
        uri: 'https://www.stangastaden.se/sokledigt/ledigbostad?refid=79784763786a4e614730334d753957514c51597376507075387a43687a2f4837',
        jQuery: 'cheerio',
        callback: function(error, res, done) {
            if(error){
                errors.push('Storsjöförvaltning starturl: ' + error);
            }
            var $ = res.$;
            console.log(res.body);
            $('#ctl00_PlaceHolderMain_FAST2_objektnasta > div > a').each(function(index, a) {
                try {
                    var toQueueUrl = url.resolve(res.request.uri.href, $(a).attr('href'));
                }
                catch(error) {
                    errors.push('Storsjöförvaltning url resolve: ' + error);
                    return false;
                }
                c.queue([{
                    uri: toQueueUrl,
                    jQuery: 'cheerio',
                    callback : function (error, res, done) {
                        if(error){
                            errors.push('Storsjöförvaltning loopUrls: ' + error);
                        }
                        else {
                            try {
                                var  $= res.$;
                                var object = {};
                                object.title = $('.mainContent > .noPaddingLeft > h2').text();
                                object.full_description = $('.mainContent > .noPaddingLeft > p').text();
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
                                errors.push('Storsjöförvaltning get info: ' + error);
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

module.exports.stangastaden_crawl = stangastaden_crawl;
