function mitthem_crawl(callback) {
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
        parser.getRobots('http://www.mitthem.se/robots.txt', function (err, crawlDelay, parser) {
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
                if (parser.canFetchSync(userAgent, '/ledigt/lagenhet')) {
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
                    callback('Not allowed mitthem');
                }
            }
        });
    }

    var init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            callback("Mitthem : " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let url = 'http://www.mitthem.se/ledigt/lagenhet';
        let staticUrl = 'http://www.mitthem.se/ledigt/';
        let array = [];
        let paginator = '#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ucNavBar_btnNavNext';
        let isDisabled = false;

        yield nightmare
            .goto(url)
            .wait(3000);

        while (!isDisabled) {
            isDisabled = yield nightmare.visible('.aspNetDisabled.btn.next.dimmed');
            let tempLinks = yield nightmare
                .evaluate(function() {
                    let links = document.querySelectorAll('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr > td:nth-child(2) > a');
                    return Array.prototype.map.call(links, function(e) {
                        return e.getAttribute('href');
                    });
                });
            let body = yield nightmare
                .evaluate(function () {
                    return document.body.innerHTML;
                });
            let $ = cheerio.load(body);
            let j = 2;
            tempLinks.shift();
            for(let i = 0; i < tempLinks.length; i++) {
                let object = {};
                object.rooms = $('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:nth-child('+j+') > td:nth-child(4) > span').text();
                object.price = $('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:nth-child('+j+') > td:nth-child(6) > span').text();
                object.square_feet = $('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:nth-child('+j+') > td:nth-child(5) > span').text();
                object.city = 'Sundsvall';
                object.url = staticUrl + tempLinks[i];
                object.adress = $('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:nth-child('+j+') > td:nth-child(2) > a').text();
                object.source = 'Mitthem';
                array.push(object);
                j++;
            }

            if(!isDisabled) {
                yield nightmare
                    .wait(paginator)
                    .click(paginator)
                    .wait(2000);
            }
        }

        yield nightmare.end();

        return array;
    }
}

module.exports.mitthem_crawl = mitthem_crawl;