function studentboet_crawl(callback) {
    const Nightmare = require('nightmare');
    const cheerio = require('cheerio');
    const vo = require('vo');
    const timeout = require('async/timeout');
    const nightmare = Nightmare({
            show: false,
            pageSettings: {
                userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36"
            }
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

    var init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            callback("studentboet : " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let url = 'http://studentboet.se/?limit=80';
        let staticUrl = 'http://studentboet.se';
        let array = [];
        let paginator = '#pagination > li.next > a';
        let isDisabled = false;
        let links = [];

        yield nightmare
            .goto(url)
            .wait(3000);

        while (!isDisabled) {
            isDisabled = yield nightmare.exists('#pagination > li.next.hidden');
            let tempLinks = yield nightmare
                .evaluate(function() {
                    let links = document.querySelectorAll('#listings > li > div.listings-image > a');
                    return Array.prototype.map.call(links, function(e) {
                        return e.getAttribute('href');
                    });
                });
            links.push(tempLinks);
            if(!isDisabled) {
                yield nightmare
                    .wait(paginator)
                    .click(paginator)
                    .wait(2500);
            }
        }

        for (let i = 0; i < links.length; i++) {
            let pageLinks = links[i];
            for(let j = 0; j < pageLinks.length; j++) {
                yield nightmare
                    .goto(staticUrl + pageLinks[j])
                    .wait(2000);

                let body = yield nightmare
                    .evaluate(function () {
                        return document.body.innerHTML;
                    });

                let object = {};
                let images = [];
                let tempImg = yield nightmare.evaluate(function () {
                    let nodes = document.querySelector('#content > div.single-content > div.single-images > ul > li:nth-child(1) > a > img');
                    if(nodes != null) {
                        return 'http://studentboet.se' +  nodes.getAttribute('src');
                    }
                });
                let $ = cheerio.load(body);
                images.push(tempImg);
                object.images = images;
                object.title = $('#content > div.single-content > div.single-facts > ul > li:nth-child(2) > p.last').text();
                object.full_description = $('#content > div.single-content > div.single-description').text();
                let check = $('#content > div.single-content > div.single-facts > ul > li:nth-child(5) > p.first > strong').text();
                if(check.indexOf('Rumsnummer') === -1) {
                    object.rooms = $('#content > div.single-content > div.single-facts > ul > li:nth-child(6) > p.last').text();
                    object.square_feet = $('#content > div.single-content > div.single-facts > ul > li:nth-child(5) > p.last').text();
                }
                else {
                    object.rooms = $('#content > div.single-content > div.single-facts > ul > li:nth-child(7) > p.last').text();
                    object.square_feet = $('#content > div.single-content > div.single-facts > ul > li:nth-child(6) > p.last').text();
                }
                object.price = $('#content > div.single-content > div.single-facts > ul').find('h5').eq(1).parent().next().text();
                object.city = 'Uppsala';
                object.url = yield nightmare.url();//
                object.adress = $('#content > div.single-content > div.single-facts > ul > li:nth-child(4) > p.last').text();
                object.source = 'Studentboet';
                array.push(object);
            }
        }
        yield nightmare.end();

        return array;
    }
}

module.exports.studentboet_crawl = studentboet_crawl;