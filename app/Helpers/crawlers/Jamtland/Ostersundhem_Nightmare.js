/*
var casper = require("casper").create({
    pageSettings: {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36"
    }
});
var url = 'https://kundportal.ostersundshem.se/incitxpandweb04760_2/Internet/Bk/VacantResidenceList.aspx';
var array = [];
var divs = [];
var i = 0;
var paginator = "", paginatorNode = 0;
var nextPage = 0;
var utils = require('utils');

function scrapePage(){
    divs = casper.evaluate(function () {
        var nodes = document.querySelectorAll('#ctl00_cphRightFrame_VacantResidenceList1_gvVacantResidence > tbody > .row');
        return [].map.call(nodes, function(node) {
            return node.textContent;
        });
    });
    var j = 2;
    i = divs.length;
    casper.repeat(i, function (response) {
        casper.wait(2000);
        casper.then(function () {
            var apartment = '#ctl00_cphRightFrame_VacantResidenceList1_gvVacantResidence > tbody > tr:nth-child('+j+')';
            casper.thenClick(apartment, function () {
                casper.wait(2000, function () {
                    var object = {};
                    var images = casper.evaluate(function () {
                        var nodes = document.querySelector('#ctl00_cphRightFrame_VacantResidenceDetail1_ImageControl1_ctl00 > div > img');
                        return [].map.call(nodes, function(node) {
                            return node.getAttribute('src');
                        });
                    });

                    object.images = images;
                    object.title = this.fetchText('#ctl00_cphRightFrame_VacantResidenceDetail1_lblAddress1');
                    object.short_description = casper.fetchText('#ctl00_cphRightFrame_VacantResidenceDetail1_lblAdminunitInformation');
                    object.full_description = casper.fetchText('#ctl00_cphRightFrame_VacantResidenceDetail1_lblAdminunitInformation');
                    object.rooms = casper.fetchText('#ctl00_cphRightFrame_VacantResidenceDetail1_lblSize');
                    object.price = casper.fetchText('#ctl00_cphRightFrame_VacantResidenceDetail1_lblRent');
                    object.square_feet = casper.fetchText('#ctl00_cphRightFrame_VacantResidenceDetail1_lblSurface');
                    object.city = 'Östersund';
                    object.url = casper.getCurrentUrl();
                    object.adress = casper.fetchText('#ctl00_cphRightFrame_VacantResidenceDetail1_lblAddress1');
                    object.source = 'Östersundshem';
                    array.push(object);
                    casper.back();
                });
            });
            j++;
        });
        casper.repeat(nextPage, function () {
            casper.wait(2000);
            casper.click(paginator);
        });
    });
    casper.then(function () {
        checkPagination.call(this);
    });
}

function checkPagination() {
    casper.open(url);
    casper.repeat(nextPage, function () {
        casper.wait(2000);
        casper.click(paginator);
    });
    casper.then(function () {
        if (casper.exists(paginator)) {
            casper.wait(2000);
            casper.click(paginator);
            nextPage++;
            casper.then(function () {
                scrapePage.call(this);
            });
        } else {
            casper.then(function() {
                utils.dump(array);
                this.exit();
            });
        }
    });
}
casper.start(url).viewport(1600,1000);
casper.then(function () {
    paginatorNode = casper.evaluate(function(){
        var node = $('#ctl00_cphRightFrame_VacantResidenceList1_pager').children().length;
        return node - 1;
    });
    paginator = '#ctl00_cphRightFrame_VacantResidenceList1_pager > a:nth-child(' + paginatorNode + ')';
    scrapePage.call(this);
});
casper.run();
*/


function ostersundshem_crawl(callback) {
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
        parser.getRobots('http://www.ostersundshem.se/robots.txt', function (err, crawlDelay, parser) {
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
                if (parser.canFetchSync(userAgent, '/incitxpandweb04760_2/Internet/Bk/VacantResidenceList')) {
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
                    callback('Not allowed Östersundshem');
                }
            }
        });
    }

    var init = timeout(start, 600000);

    init(function(err, result) {
        if(err){
            callback("Östersundshem: " + err);
        }
        else {
            callback(null, result);
        }
    });

    function* run() {
        let url = 'https://kundportal.ostersundshem.se/incitxpandweb04760_2/Internet/Bk/VacantResidenceList.aspx';
        let array = [];
        let paginator;
        let nextExists;
        let maxPage = 15;
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

        while (nextExists < paginatorNode && nextPage < maxPage) {
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
                object.rooms = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblSize').text();
                object.price = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblRent').text();
                object.square_feet = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblSurface').text();
                object.city = 'Östersund';
                object.url = yield nightmare.url();
                object.adress = $('#ctl00_cphRightFrame_VacantResidenceDetail1_lblAddress1').text();
                object.source = 'Östersundshem';
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

module.exports.ostersundshem_crawl = ostersundshem_crawl;