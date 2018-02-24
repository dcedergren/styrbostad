function akelius_crawl(callback) {
    var Crawler = require("crawler");
    var array = [];
    var errors = [];
    var parser = require('../Robots_Parser');
    var userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36';
    var setCrawlDelay = 2500;
    var staticUrl = "https://www.akelius.se/search/apartments/";
    var c = new Crawler({
        retries: 1,
        retryTimeout: 2500,
        rateLimit: setCrawlDelay,
        userAgent: userAgent,
        callback: function(error, res, done) {
            if(error){
                errors.push('Akelius starturl: ' + error);
            }
            else {
                try {
                    var jsonTempArray = JSON.parse(res.body);

                    var jsonArray = jsonTempArray.data;
                    var city = res.options.parameter;
                    jsonArray.forEach(function(item) {
                        var object = {};
                        object.title = item.propertyTitle;
                        object.price = item.price.split('.').shift();
                        object.square_feet = item.areaSize;
                        object.rooms = item.numberOfRooms;
                        object.city = item.address.city;
                        object.source = 'Akelius';
                        var url = item._links.unit.split( '/' );
                        object.url = staticUrl + city  + '/' + url[ url.length - 2 ] + '/' + url[ url.length - 1 ];
                        object.adress = item.address.postalAddress + ',' + item.address.zip;
                        array.push(object);
                    });
                }
                catch(error) {
                    errors.push('Akelius get info: ' + error);
                }
            }
            done();
        }//callback
    });

    parser.getRobots('https://www.akelius.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/api/v2/teasers/SE/')) {
                start_crawl();
            }
            else {
                callback('akelius not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue({
            uri: 'https://cl-lettings-web.azurewebsites.net/api/v2/teasers/SE/Helsingborg/apartment',
            jQuery: false,
            parameter:"helsingborg",
        });
        c.queue({
            uri: 'https://cl-lettings-web.azurewebsites.net/api/v2/teasers/SE/Brandbergen/apartment',
            jQuery: false,
            parameter:"brandbergen",
        });
        c.queue({
            uri: 'https://cl-lettings-web.azurewebsites.net/api/v2/teasers/SE/Lund/apartment',
            jQuery: false,
            parameter:"lund",
        });
        c.queue({
            uri: 'https://cl-lettings-web.azurewebsites.net/api/v2/teasers/SE/Malm%C3%B6/apartment',
            jQuery: false,
            parameter:"malmo",
        });
        c.queue({
            uri: 'https://cl-lettings-web.azurewebsites.net/api/v2/teasers/SE/Salem/apartment',
            jQuery: false,
            parameter:"salem",
        });
        c.queue({
            uri: 'https://cl-lettings-web.azurewebsites.net/api/v2/teasers/SE/S%C3%B6dert%C3%A4lje/apartment',
            jQuery: false,
            parameter:"sodertalje",
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

module.exports.akelius_crawl = akelius_crawl;