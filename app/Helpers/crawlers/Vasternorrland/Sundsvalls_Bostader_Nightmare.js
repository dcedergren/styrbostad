function sundsvalls_bostader_crawl(callback) {
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
        parser.getRobots('http://www.subo.se/robots.txt', function (err, crawlDelay, parser) {
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
                if (parser.canFetchSync(userAgent, '/C157/Lediga')) {
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
                    callback('Not allowed Sundsvalls Bostäder');
                }
            }
        });
    }

    var init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            callback("Sundsvalls Bostäder : " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let url = 'http://www.subo.se/C157/Lediga%20l%C3%A4genheter/Hyresledigt';
        let staticUrl = 'http://www.subo.se';
        let array = [];

        yield nightmare
            .goto(url)
            .wait(100);

        let links = yield nightmare
            .evaluate(function() {
                let links = document.querySelectorAll('#ProductsGrid > div > div > a');
                return Array.prototype.map.call(links, function(e) {
                    return e.getAttribute('href');
                });
            });

        /*while (!isDisabled) {
            isDisabled = yield nightmare.visible('.aspNetDisabled.btn.next.dimmed');
            let tempLinks = yield nightmare
                .evaluate(function() {
                    let links = document.querySelectorAll('#ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col1_ObjectList_list > table > tbody > tr:not(:first-child) > td:nth-child(2) > a');
                    return Array.prototype.map.call(links, function(e) {
                        return e.getAttribute('href');
                    });
                });
            links.push(tempLinks);
            if(!isDisabled) {
                yield nightmare
                    .wait(paginator)
                    .click(paginator)
                    .wait(2000);
            }
        }*/
        for (let i = 0; i < links.length; i++) {
            yield nightmare
                .goto(staticUrl + links[i])
                .wait(2000);

            let body = yield nightmare
                .evaluate(function () {
                    return document.body.innerHTML;
                });

            let object = {};
            let images = [];
            let tempImg = yield nightmare.evaluate(function () {
                let nodes = document.querySelector('#ctl00_ctl00_ctl00_main_main_rptProduct_ctl00_mainImage');
                if(nodes != null) {
                    return 'http://www.subo.se' +  nodes.getAttribute('src');
                }
            });
            let $ = cheerio.load(body);
            let check = $('#ProductItem > h1').text();
            if(check.indexOf('Lokal') === -1){
                images.push(tempImg);
                object.images = images;
                object.title = $('#ProductItem > h1').text();
                object.full_description = $('#ProductLongText').text();
                object.rooms = $('#ProductArticle').text().split(':')[1];
                object.price = $('#ProductPrice').text();
                object.square_feet = $('#ProductArticle').text().split(':').pop();
                object.city = 'Sundsvall';
                object.url = yield nightmare.url();//
                object.adress = $('#ProductItem > h1').text();
                object.source = 'Sundsvalls Bostäder';
                array.push(object);
            }
        }
        yield nightmare.end();

        return array;
    }
}

module.exports.sundsvalls_bostader_crawl = sundsvalls_bostader_crawl;

