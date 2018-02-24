function stiftelsen_crawl(callback) {
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

    parser.getRobots('http://stiftelsen-karlstadshus.se/robots.txt', function (err, crawlDelay, parser) {
        if(err) {
            start_crawl();
        }
        else {
            if(parser.canFetchSync(userAgent, '/odata/tenant/PublishEntries')) {
                start_crawl();
            }
            else {
                callback('stiftelsen-karlstadshus not allowed');
            }
        }
    });

    function start_crawl() {
        c.queue([{
            uri: 'https://karlstadshus.riksbyggen.se/odata/tenant/PublishEntries?\$expand=LeaseOutCase(\$expand=Address,MainImage,Details)&\$orderby=LeaseOutCase/Address/StreetAddress&\$count=true&\$filter=(ContractTypeId%20eq%202)&\$top=10000',
            jQuery: false,
            callback: function (error, res, done) {
                if (error) {
                    errors.push('Stiftelsen Karlstadshus starturl: ' + error);
                }
                else {
                    try {
                        var jsonTempArray = JSON.parse(res.body);
                        var jsonArray = jsonTempArray.value;

                        jsonArray.forEach(function (item) {
                            var object = {};
                            object.title = item.LeaseOutCase.RoomsDesignation + ", " + item.LeaseOutCase.LeaseOutAreaDesignationLevel3;
                            object.rooms = item.LeaseOutCase.Rooms;
                            object.price = item.LeaseOutCase.Rent;
                            object.square_feet = item.LeaseOutCase.Space;
                            object.city = 'Karlstad';
                            object.source = 'Stiftelsen Karlstadshus';
                            object.url = 'https://karlstadshus.riksbyggen.se/tenant/lease-out-cases/' + item.LeaseOutCaseId;
                            object.adress = item.LeaseOutCase.Address.StreetAddress;
                            array.push(object);
                        });
                    }
                    catch (error) {
                        errors.push('Stiftelsen Karlstadshus get info: ' + error);
                    }
                }
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

module.exports.stiftelsen_crawl = stiftelsen_crawl;