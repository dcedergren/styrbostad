function getRobots(url, callback) {
    let robots = require('robots'), parser = new robots.RobotsParser(
        url,
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36',
        after_parse
    );
    let setCrawlDelay = 2500;

    function after_parse(parser, success) {
        if(success) {
            let crawlDelay = parser.getCrawlDelay('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36');
            if(crawlDelay) {
                setCrawlDelay = crawlDelay;
            }
            callback(null, setCrawlDelay, parser);
        }
        else {
            callback(url + ': no connection robots');
        }
    }
}

module.exports.getRobots = getRobots;
