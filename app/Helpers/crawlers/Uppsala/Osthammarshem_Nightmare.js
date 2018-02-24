function osthammarshem_crawl(callback) {
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
        parser.getRobots('http://www.osthammarshem.com/robots.txt', function (err, crawlDelay, parser) {
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
                if (parser.canFetchSync(userAgent, '/IncitXpandWeb04801_2/Internet/bk/VacantResidenceList')) {
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
                    callback('Not allowed Östhammarshem');
                }
            }
        });
    }

    var init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            callback("Östhammarshem: " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let url = 'http://www.osthammarshem.com:8080/IncitXpandWeb04801_2/Internet/bk/VacantResidenceList.aspx';
        let array = [];
        let paginator;
        let nextExists;
        let nextPage = 0;
        let links = [];
        let paginatorNode;

        yield nightmare
            .goto(url)
            .wait(5000);

        paginatorNode = yield nightmare.evaluate(function(){
            let node = $('#ctl00_cphRightFrame_VacantResidenceList1_pager').children().length;
            return node - 1;
        });

        if(paginatorNode === -1)
            paginatorNode = 4;
        else
            paginator = '#ctl00_cphRightFrame_VacantResidenceList1_pager > a:nth-child(' + paginatorNode + ')';

        nextExists = 3;

        while (nextExists < paginatorNode) {
            for(let k = 0; k < nextPage; k++) {
                yield nightmare
                    .click(paginator)
                    .wait(2000);
            }
            links = yield nightmare
                .evaluate(function () {
                    var nodes = document.querySelectorAll('#ctl00_cphRightFrame_VacantResidenceList1_gvVacantResidence > tbody > .row');
                    return [].map.call(nodes, function(node) {
                        return node.textContent;
                    });
                });
            let j = 2;

            for (let i = 0; i < links.length; i++) {
                let apartment = '#ctl00_cphRightFrame_VacantResidenceList1_gvVacantResidence > tbody > tr:nth-child('+j+')';

                yield nightmare
                    .click(apartment)
                    .wait(2000);

                let body = yield nightmare
                    .evaluate(function () {
                        return document.body.innerHTML;
                    });

                let $ = cheerio.load(body);
                var object = {};
                object.title = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblAddress1').text();
                object.rooms = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblSize').text();
                object.price = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblRent').text();
                object.square_feet = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblSurface').text();
                object.city = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblLocation').text().split(' ').shift();
                object.url = yield nightmare.url();
                object.adress = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblAddress1').text();
                object.source = 'Östhammarshem';
                array.push(object);

                yield nightmare
                    .goto(url)
                    .wait(2000);

                if(i !== links.length - 1) {
                    for(let k = 0; k < nextPage; k++) {
                        yield nightmare
                            .click(paginator)
                            .wait(2000);
                    }
                }
                j++;
            }
            nextExists++;
            nextPage++;
        }
        yield nightmare.end();

        return array;
    }
}

module.exports.osthammarshem_crawl = osthammarshem_crawl;