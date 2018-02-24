function victoriapark_crawl(callback) {
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
        parser.getRobots('http://www.victoriapark.se/robots.txt', function (err, crawlDelay, parser) {
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
                if (parser.canFetchSync(userAgent, '/HSS/Object/External/')) {
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
                    callback('Not allowed Victoriapark');
                }
            }
        });
    }

    var init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            console.log(err)
            callback("Victoriapark: " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let links = [];
        let isDisabled = false;
        let paginator = "#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ucNavBar_btnNavNext";
        let url = 'http://minasidor.victoriapark.se/HSS/Object/External/object_list.aspx?cmguid=9dccab18-c677-40b7-9044-42e9e428db61&type=CMBoLgh';
        let array = [];

        yield nightmare
            .goto(url)
            .wait(2000);

        while (!isDisabled) {
            isDisabled = yield nightmare.visible('.aspNetDisabled.btn.next.dimmed');
            let tempLinks = yield nightmare
                .evaluate(function() {
                    var links = document.querySelectorAll('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_objectList_list > table > tbody > tr > td:nth-child(2) > a');
                    return Array.prototype.map.call(links, function(e) {
                        return e.getAttribute('href');
                    });
                });

            tempLinks.shift();
            links.push(tempLinks);

            if(!isDisabled) {
                yield nightmare
                    .wait(paginator)
                    .click(paginator)
                    .wait(2000);
            }
        }

        for(let j = 0; j < links.length; j++) {
            let linksInArray = links[j];
            for (let i = 0; i < linksInArray.length; i++) {
                yield nightmare
                    .goto(linksInArray[i])
                    .wait(2000);

                let body = yield nightmare
                    .evaluate(function () {
                        return document.body.innerHTML;
                    });
                let $ = cheerio.load(body);
                let object = {};

                object.title = $('#overview > h1').text();
                object.rooms = $('#ctl06_ctl00_0_ctl02_0_ctl01_0_Tr23_0 > td').text();
                object.price = $('#ctl06_ctl00_0_ctl02_0_ctl01_0_Tr25_0 > td').text();
                object.square_feet = $('#ctl06_ctl00_0_ctl02_0_ctl01_0_Tr24_0 > td').text();
                object.city = $('#ctl06_ctl00_0_ctl03_0_EstateTexts_0 > p:nth-child(4)').text();
                object.city = object.city.split("/").shift();
                object.url = yield nightmare.url();
                object.adress = $('#ctl06_ctl00_0_ctl03_0_EstateTexts_0 > p:nth-child(6)').text();
                object.source = 'Victoria park';
                array.push(object);
            }
        }

        yield nightmare.end();

        return array;
    }
}

module.exports.victoriapark_crawl = victoriapark_crawl;