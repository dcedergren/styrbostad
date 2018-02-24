function orebroBostader_crawl(callback) {
    const Nightmare = require('nightmare');
    const cheerio = require('cheerio');
    const vo = require('vo');
    const parser = require('../Robots_Parser');
    const timeout = require('async/timeout');
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36';
    const nightmare = Nightmare({
            show: false,
            pageSettings: {
                userAgent: userAgent
            }
        }
    ).viewport(1600,1000);

    function start(callback) {
        parser.getRobots('http://www.obo.se/robots.txt', function (err, crawlDelay, parser) {
            if (err) {
                vo(run)(function(err, result) {
                    if (err) {
                        nightmare.proc.disconnect();
                        nightmare.proc.kill();
                        nightmare.ended = true;
                        callback(err);
                    }
                    else {
                        callback(null, result);
                    }
                });
            }
            else {
                if (parser.canFetchSync(userAgent, '/pgSearchResult')) {
                    vo(run)(function(err, result) {
                        if (err) {
                            nightmare.proc.disconnect();
                            nightmare.proc.kill();
                            nightmare.ended = true;
                            callback(err);
                        }
                        else {
                            callback(null, result);
                        }
                    });
                }
                else {
                    callback('Not allowed Örebrobostäder');
                }
            }
        });
    }

    var init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            callback("ÖrebroBostäder: " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let staticUrl = 'https://marknad.obo.se/';
        let url = 'https://marknad.obo.se/pgSearchResult.aspx#seekAreaMode=simple&search=y&page=1&syndicateNo=1&objectMainGroupNo=3&companyNo=-1&rent=0;20000&area=0;250&advertisement=-1&type=standard&take=1000000&search-list-wrapper=10';
        let array = [];

        yield nightmare
            .goto(url)
            .wait(4000);

        let links = yield nightmare
            .evaluate(function() {
                var links = document.querySelectorAll('#search-container > div > div > div > div:nth-child(4) > div > a.btn.pull-right.btn-primary');
                return Array.prototype.map.call(links, function(e) {
                    return e.getAttribute('href');
                });
            });

        links.shift();
        let body = yield nightmare
            .evaluate(function () {
                return document.body.innerHTML;
            });
        let $ = cheerio.load(body);
        let j = 1;

        for (let i = 0; i < links.length; i++) {
            let link = links[i].split('%26scrollto').shift();
            let object = {};
            object.rooms = $('#search-container > div:nth-child(' + j + ') > div > div > div:nth-child(3) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)').text();
            object.price = $('#search-container > div:nth-child(' + j + ') > div > div > div:nth-child(3) > div > table > tbody > tr:nth-child(4) > td:nth-child(2)').text();
            object.square_feet = $('#search-container > div:nth-child(' + j + ') > div > div > div:nth-child(3) > div > table > tbody > tr:nth-child(3) > td:nth-child(2)').text();
            object.city = 'Örebro';
            object.url = staticUrl + link;
            object.adress = $('#search-container > div:nth-child(' + j + ') > div > div > div:nth-child(2) > div > h4').text().split(',').shift();
            object.source = 'ÖrebroBostäder';
            array.push(object);
            j++;
        }

        yield nightmare.end();

        return array;
    }
}

module.exports.orebroBostader_crawl = orebroBostader_crawl;
