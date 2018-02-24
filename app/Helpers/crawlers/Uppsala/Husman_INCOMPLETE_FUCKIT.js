function husman_crawl(callback) {
    const Nightmare = require('nightmare');
    const cheerio = require('cheerio');
    const vo = require('vo');
    const timeout = require('async/timeout');
    const nightmare = Nightmare({
            show: true,
            pageSettings: {
                userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36"
            },
        }
    ).viewport(1600,1000);

    function start(callback) {
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

    let init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            callback("Roslagsbostäder: " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let url = 'http://www.husman.se/ledigalagenheter/';
        let array = [];

        yield nightmare
            .goto(url)
            .wait(4000);

        let divs = yield nightmare
            .evaluate(function() {
                let nodes = document.querySelectorAll('#wrap > .hyresobjekt');
                return [].map.call(nodes, function(node) {
                    return node.textContent;
                });
            });
console.log(divs);
        let body = yield nightmare
            .evaluate(function () {
                return document.body.innerHTML;
            });
let j = 1;
        for (let i = 0; i < divs.length; i++) {

            let $ = cheerio.load(body);
            let object = {};
            let images = [];
            let tempImg = yield nightmare.evaluate(function () {
                let nodes = document.querySelector('#carousel-example-generic > div > div.item.active > img');
                if(nodes != null) {
                    return 'http://marknad.roslagsbostader.se' + nodes.getAttribute('src');
                }
            });
            images.push(tempImg);
            object.images = images;
            object.full_description = $('#objectinfo-wrapper > div:nth-child(2) > div:nth-child(1) > div.row.hidden-xs.hidden-sm > div').text();
            object.rooms = $('#wrap > div.objekt'+j+'.hyresobjekt > div > span.info0.textrad > span.text').text();
            object.square_feet = $('#objectinfo-wrapper > div:nth-child(2) > div.col-md-4.hidden-xs.hidden-sm > div > div.panel-body > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2)').text();
            object.price = $('#objectinfo-wrapper > div:nth-child(2) > div.col-md-4.hidden-xs.hidden-sm > div > div.panel-body > table:nth-child(1) > tbody > tr:nth-child(4) > td:nth-child(2)').text();
            object.city = $('#objectinfo-wrapper > div:nth-child(1) > div > h1').text().split(',').pop();
            object.url = yield nightmare.url();
            object.adress = $('#objectinfo-wrapper > div:nth-child(2) > div.col-md-4.hidden-xs.hidden-sm > div > div.panel-body > table:nth-child(1) > tbody > tr:nth-child(6) > td:nth-child(2)').text();
            object.source = 'Roslagsbostäder';
            object.title = $('#objectinfo-wrapper > div:nth-child(1) > div > h1').text();
            array.push(object);
            console.log(object);
            j++;
        }

        yield nightmare.end();

        return array;
    }
}

module.exports.husman_crawl = husman_crawl;

husman_crawl();
