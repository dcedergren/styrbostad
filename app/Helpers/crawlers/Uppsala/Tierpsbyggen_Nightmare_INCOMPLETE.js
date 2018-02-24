function tierpsbyggen_crawl(callback) {
    const Nightmare = require('nightmare');
    require('nightmare-iframe-manager')(Nightmare);
    const cheerio = require('cheerio');
    const vo = require('vo');
    const parser = require('../Robots_Parser');
    const timeout = require('async/timeout');
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36';
    const nightmare = Nightmare({
            show: true,
            pageSettings: {
                userAgent: userAgent
            }
        }
    ).viewport(1600,1000);

    function start(callback) {
        parser.getRobots('http://www.tierpsbyggen.se/robots.txt', function (err, crawlDelay, parser) {
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
                if (parser.canFetchSync(userAgent, '/IncitXpandWeb01380_1/Internet/Bk/')) {
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
                    callback('Not allowed Tierpsbyggen');
                }
            }
        });
    }

    var init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            callback("Tierpsbyggen: " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let url = 'http://www.tierpsbyggen.se/index.php';
        let array = [];

        yield nightmare
            .goto(url)
            .wait(2000)
            .enterIFrame('#blockrandom0')
            .click('#aspnetForm > table > tbody > tr > td > input')
            //.exitIFrame()
            .wait(3000)
            //.enterIFrame('#blockrandom')
            .wait(2000);


        let links = yield nightmare
                .evaluate(function() {
                    var links = document.querySelectorAll('#ctl00_cphRightFrame_VacantResidenceList1_grdVacancy > tbody > tr > td:nth-child(3) > a');
                    return Array.prototype.map.call(links, function(e) {
                        return e.getAttribute('href');
                    });
                });

        console.log('fdhfd' + links)
        /*yield nightmare
            .exitIFrame();*/

        links.shift();
        let body = yield nightmare
            .evaluate(function () {
                return document.body.innerHTML;
            });

        let $ = cheerio.load(body);
        let j = 2;
        console.log('fdhfd' + $)
        for (let i = 0; i < links.length; i++) {
            let link = links[i].split('..').join("");
            let object = {};
            object.rooms = $('#ctl00_cphRightFrame_VacantResidenceList1_grdVacancy > tbody > tr:nth-child(' + j + ') > td:nth-child(4)').text();
            object.square_feet = $('#ctl00_cphRightFrame_VacantResidenceList1_grdVacancy > tbody > tr:nth-child(' + j + ') > td:nth-child(5)').text();
            object.price = $('#ctl00_cphRightFrame_VacantResidenceList1_grdVacancy > tbody > tr:nth-child(' + j + ') > td:nth-child(6)').text();
            object.city = $('#ctl00_cphRightFrame_VacantResidenceList1_grdVacancy > tbody > tr:nth-child(' + j + ') > td:nth-child(2)').text();
            object.url = link;
            object.adress = $('#ctl00_cphRightFrame_VacantResidenceList1_grdVacancy > tbody > tr:nth-child(' + j + ') > td:nth-child(3)').text();
            object.source = 'Tierpsbyggen';
            array.push(object);
            j++;
            console.log(object)
        }

        yield nightmare.end();

        return array;
    }
}

module.exports.tierpsbyggen_crawl = tierpsbyggen_crawl;
