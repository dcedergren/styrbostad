/*var casper = require("casper").create({
    pageSettings: {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36"
    }
});
var array = [];
var links = [];
var url = 'https://bo.storsjohus.se/';
var utils = require('utils');

function getLinks() {
    var links = document.querySelectorAll('#AnimatedLine > div.DesktopNavigationWrapper.hidden-lg-down > div > div > nav > ul > li.NoPage.NoPage__Apartments > div > ul > li > p > a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start(url).viewport(1600,1000);

casper.then(function() {
    links = this.evaluate(getLinks);
    casper.each(links, function (self, link) {
        self.thenOpen(link, function () {
            this.wait(2300,function () {
                var object = {};
                /!*var images = [];
                cheerioAdv.find($, '#primary .apartmentimages img').each(function( index ) {
                    images.push($(this).attr('style').match(/\(([^)]+)\)/)[1]);
                });//url
                object.images = images;*!/
                object.title = this.fetchText('body > div:nth-child(1) > div.Apartment > div.ApartmentHeader > div > div > div.col-xs-12.col-sm-12.col-md-7.col-lg-6 > h1');
                object.short_description = casper.fetchText('body > div:nth-child(1) > div.Apartment > div:nth-child(2) > div.row.hidden-sm-down > div > div > p');
                object.full_description = casper.fetchText('body > div:nth-child(1) > div.Apartment > div:nth-child(2) > div.row.hidden-sm-down > div > div > p');
                object.rooms = casper.fetchText('body > div:nth-child(1) > div.Apartment > div.ApartmentHeader > div > div > div.col-xs-12.col-sm-12.col-md-7.col-lg-6 > ul > li:nth-child(1)');
                object.price = casper.fetchText('body > div:nth-child(1) > div.Apartment > div.ApartmentHeader > div > div > div.col-xs-12.col-sm-12.col-md-7.col-lg-6 > ul > li:nth-child(3)');
                object.square_feet = casper.fetchText('body > div:nth-child(1) > div.Apartment > div.ApartmentHeader > div > div > div.col-xs-12.col-sm-12.col-md-7.col-lg-6 > ul > li:nth-child(2)');
                object.city = 'Östersund';
                object.url = casper.getCurrentUrl();
                object.adress = casper.fetchText('body > div:nth-child(1) > div.Apartment > div.ApartmentHeader > div > div > div.col-xs-12.col-sm-12.col-md-7.col-lg-6 > ul > li:nth-child(5)');
                object.source = 'Storsjöhus';
                array.push(object);
            });

        });
    });
});
casper.run(function () {
    utils.dump(array);
    this.exit();
});*/

