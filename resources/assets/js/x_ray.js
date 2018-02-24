var Nightmare = require('nightmare');
var vo = require('vo');

var links = [];

vo(run)(function(err, result) {
    if (err) throw err;
});

function* run() {
    var nightmare = Nightmare({ show: true })

    yield nightmare
        .viewport(800, 1600)
        .goto('http://xpand.tierpsbyggen.se/IncitXpandWeb01380_1/Internet/Bk/VacantResidenceSearch.aspx')
        .wait('input.ButtonGeneral')
        .click('input.ButtonGeneral')
        .wait(2000)

    links = yield nightmare.evaluate(function () {
        return Array.from(document.querySelectorAll('#ctl00_cphRightFrame_VacantResidenceList1_grdVacancy > tbody > tr.GridItem > td:nth-child(3) > a')).map(a => a.href);
    });
    for (var i = 0; i < links.length; i++) {
        yield nightmare
            .goto(links[i])
            .wait(5000)
    }

    yield nightmare.end()
}