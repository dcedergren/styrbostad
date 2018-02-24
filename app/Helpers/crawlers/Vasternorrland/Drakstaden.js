function svedin_crawl(callback) {
    var Crawler = require("crawler");
    var cheerio = require('cheerio');
    var url = require('url');
    var array = [];
    var errors = [];
    var c = new Crawler({
        retries: 1,
        retryTimeout: 2500,
        rateLimit: 2500,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36",
    });

    c.queue([{
        uri: 'http://www.drakstaden.se/ledigt',
        jQuery: 'cheerio',
        callback: function(error, res, done) {
            if(error){
                errors.push('Svedins starturl: ' + error);
            }
            var $ = res.$;
            let apartmentNode = 2;
            let breakLoop = true;
            $('#rowlist_CONTENT > .rowitem:not(:first-child)').each(function(index, a) {
                try {
                    /*if($('#post-9 > div.table-responsive > table > tbody > tr:nth-child(' + apartmentNode + ')').find("em").length >= 1){
                        breakLoop = false;
                    }*/
                    if(breakLoop) {
                        var object = {};
                        object.title = $('#post-9 > div.table-responsive > table > tbody > tr:nth-child(' + apartmentNode + ') > td:nth-child(1)').text() + ', Sundsvall';
                        object.full_description = $('#block_content_210 > div > div > strong:nth-child(7)').text();
                        object.price = $('#post-9 > div.table-responsive > table > tbody > tr:nth-child(' + apartmentNode + ') > td:nth-child(4)').text();
                        object.square_feet = $('#post-9 > div.table-responsive > table > tbody > tr:nth-child(' + apartmentNode + ') > td:nth-child(2)').text();
                        object.rooms = $('#post-9 > div.table-responsive > table > tbody > tr:nth-child(' + apartmentNode + ') > td:nth-child(3)').text();
                        object.city = 'Sundsvall';
                        object.source = 'Svedins';
                        object.url = res.request.uri.href + '/breakUrl' + $('#post-9 > div.table-responsive > table > tbody > tr:nth-child(' + apartmentNode + ') > td:nth-child(1)').text();
                        object.adress = $('#post-9 > div.table-responsive > table > tbody > tr:nth-child(' + apartmentNode + ') > td:nth-child(1)').text();
                        array.push(object);
                        apartmentNode++;
                        console.log(object)
                    }
                }
                catch(error) {
                    errors.push('Svedins get info: ' + error);
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

module.exports.svedin_crawl = svedin_crawl;

svedin_crawl()