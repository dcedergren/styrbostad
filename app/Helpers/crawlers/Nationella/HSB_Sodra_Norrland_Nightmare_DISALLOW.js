function start() {
    let setCrawlDelay = 2500;
    let robots = require('robots'), parser = new robots.RobotsParser();

    function mitthem_crawl(callback) {
        parser.setUrl('https://www.hsb.se/robots.txt', function(parser, success) {
            if(success) {
                console.log('--------------')
                crawl();
                /*var GoogleBotDelay = parser.getDisallowedPaths("Google-bot");
                console.log('--------------' + GoogleBotDelay)*/
            }
        });
    }

    function check(url, callback) {
        parser.canFetch('*', url, function (access) {
            callback(access);
        });
    }


    function crawl() {
        check('https://www.hsb.se', function (access) {
            if(access) {
                console.log('yep')
            }
            else {
                console.log('nope')
            }
        })

    }


    mitthem_crawl();
}


module.exports.start = start;





start()

