function heimstaden_crawl(callback) {
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
        parser.getRobots('https://heimstaden.com/robots.txt', function (err, crawlDelay, parser) {
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
                if (parser.canFetchSync(userAgent, '/ledigt/')) {
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
                    callback('Not allowed Heimstaden');
                }
            }
        });
    }

    var init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            callback("Heimstaden: " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let url = 'https://mitt.heimstaden.com/ledigt/?action=search';
        let staticUrl = 'https://mitt.heimstaden.com/ledigt/';
        let array = [];
        let paginator = '#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ucNavBar_btnNavNext';
        let isDisabled = false;
        let links = [];

        yield nightmare
            .goto(url)
            .wait(3000)
            .click('#ctl00_ctl01_ucCookieCheck_pnlCookieCheck > div > div.pageFooter > input')
            .click('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ctl00_btnSearch')
            .wait(3000);

        while (!isDisabled) {
            isDisabled = yield nightmare.visible('.aspNetDisabled.btn.next.dimmed');
            links = yield nightmare
                .evaluate(function() {
                    let links = document.querySelectorAll('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:not(:first-child) > td:nth-child(2) > a');
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

            for(let i = 0; i < links.length; i++) {
                let object = {};
                object.rooms = $('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:nth-child('+j+') > td:nth-child(4) > span').text();
                object.price = $('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:nth-child('+j+') > td:nth-child(6) > span').text();
                object.square_feet = $('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:nth-child('+j+') > td:nth-child(5) > span').text();
                object.city = $('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:nth-child('+j+') > td:nth-child(3) > span').text().split('-').shift();
                object.url = staticUrl + links[i];
                object.adress = $('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:nth-child('+j+') > td:nth-child(2) > a').text();
                object.source = 'Heimstaden';
                array.push(object);
                j++;
            }

            if(!isDisabled) {
                yield nightmare
                    .wait(4000)
                    .click(paginator)
                    .wait(4000);
            }
        }
        yield nightmare.end();

        return array;
    }
}

module.exports.heimstaden_crawl = heimstaden_crawl;