const async = require('async');
const fs = require('fs');
var test = console.log;
console.log = function() {};

const kbab = require('./Varmland/Kbab.js');
const willhem = require('./Varmland/Willhem.js');
const balder = require('./Nationella/Balder.js');
const finfast = require('./Orebro/Finfast_TODO.js');
const stiftelsen = require('./Varmland/Stiftelsen.js');
const dios = require('./Nationella/Dios.js');
const boplatssyd = require('./Skane/Boplatssyd.js');
const afbostader = require('./Skane/AFBostader.js');
const akelius = require('./Skane/Akelius.js');
const storsjoforvaltning = require('./Jamtland/Storsjoforvaltning');
const uppsala_Bostadsformedling = require('./Uppsala/Uppsala_Bostadsformedling');
const victoriapark = require('./Nationella/Victoriapark_Nightmare');
const rikshem = require('./Nationella/Rikshem_Nightmare');
const rikshem_Student = require('./Nationella/Rikshem_Student_Nightmare');
//const tierpsbyggen = require('./Uppsala/Tierpsbyggen_Nightmare_INCOMPLETE');
const roslagsbostader = require('./Uppsala/Roslagsbostader_Nightmare');
const vasterstaden = require('./Nationella/Vasterstaden');
const heimstaden = require('./Nationella/Heimstaden_Nightmare');
const orebroBostader = require('./Orebro/OrebroBostader_Nightmare');
const osthammarshem = require('./Uppsala/Osthammarshem_Nightmare');
const du_ar_hemma = require('./Ostergotland/Du_Ar_Hemma_Nightmare');
const ostersundshem = require('./Jamtland/Ostersundhem_Nightmare');
const faculta = require('./Vasternorrland/Faculta');
//const drakstaden = require('./Vasternorrland/Drakstaden');
const mitthem = require('./Vasternorrland/Mitthem_Nightmare');
const sundsvalls_bostader = require('./Vasternorrland/Sundsvalls_Bostader_Nightmare');
const svedins = require('./Vasternorrland/Svedin');
const tvattbjornen = require('./Vasternorrland/Tvattbjornen');

var tasks = [
    function(callback) {
        roslagsbostader.roslagsbostader_crawl(callback);
    },
    function(callback) {
        du_ar_hemma.du_ar_hemma_crawl(callback);
    },
    function(callback) {
        orebroBostader.orebroBostader_crawl(callback);
    },
    function(callback) {
        victoriapark.victoriapark_crawl(callback);
    },
    function(callback) {
        rikshem_Student.rikshem_student_crawl(callback);
    },
    function(callback) {
        rikshem.rikshem_crawl(callback);
    },
    function(callback) {
        heimstaden.heimstaden_crawl(callback);
    },
    function(callback) {
        ostersundshem.ostersundshem_crawl(callback);
    },
    function(callback) {
        mitthem.mitthem_crawl(callback);
    },
    function(callback) {
        vasterstaden.vasterstaden_crawl(callback);
    },
    function(callback) {
        uppsala_Bostadsformedling.uppsala_Bostadsformedling_crawl(callback);
    },
    function(callback) {
        boplatssyd.boplatssyd_crawl(callback);
    },
    function(callback) {
        kbab.kbab_crawl(callback);
    },
    function(callback) {
        willhem.willhem_crawl(callback);
    },
    function(callback) {
        balder.balder_crawl(callback);
    },
    function(callback) {
        finfast.finfast_crawl(callback);
    },
    function(callback) {
        stiftelsen.stiftelsen_crawl(callback);
    },
    function(callback) {
        dios.dios_crawl(callback);
    },
    function(callback) {
        afbostader.afbostader_crawl(callback);
    },
    function(callback) {
        akelius.akelius_crawl(callback);
    },
    function(callback) {
        storsjoforvaltning.storsjoforvaltning_crawl(callback);
    },
    function(callback) {
        osthammarshem.osthammarshem_crawl(callback);
    },
    function(callback) {
        faculta.faculta_crawl(callback);
    },
    function(callback) {
        sundsvalls_bostader.sundsvalls_bostader_crawl(callback);
    },
    function(callback) {
        svedins.svedin_crawl(callback);
    },
    function(callback) {
        tvattbjornen.tvattbjornen_crawl(callback);
    },
];

function start(callback) {
    async.parallelLimit(async.reflectAll(tasks), 3, function (err, results) {

        let arrayResults = [];
        let arrayErrors = [];
        let apartments = [];
        results.forEach(function (value) {
            if(value['value']) {
                arrayResults.push(value['value']);
            }
            if(value['error']) {
                arrayErrors.push(value['error']);
            }
        });

        arrayResults.forEach(function (object) {
            for (var index in object) {
                if (!object.hasOwnProperty(index)) {
                    continue;
                }
                apartments.push(object[index]);
            }
        });

        /*let jsonErrors = JSON.stringify(arrayErrors, null, 4);
         let jsonApartments = JSON.stringify(apartments, null, 4);*/
        let testa = [apartments, arrayErrors];
        let json = JSON.stringify(testa, null, 4);
        callback(false, json);
    });
}
//2700000
var init = async.timeout(start, 2000000);

init(function(err, result) {
    if(err) {
        process.exit();
    }
    console.log = test;
    console.log(result);
});

