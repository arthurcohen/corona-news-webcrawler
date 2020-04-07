var Crawler = require('simplecrawler');
var cheerio = require('cheerio');


const secure_sources = [
    // 'https://oglobo.globo.com/',
    // 'https://blogs.oglobo.globo.com/lauro-jardim/post/sao-paulo-vai-estender-quarentena-ate-o-fim-de-abril.html',
    // 'https://oglobo.globo.com/sociedade/coronavirus/',
    "http://www.tribunadonorte.com.br/"
];

secure_sources.forEach(source => {
    console.log(`starting fetch from ${source}`);

    var crawler = new Crawler(source);
    
    crawler.maxDepth = 2;
    
    crawler
    .on('fetchcomplete', (queueItem, responseBody, response) => {
        // var $ = cheerio.load(responseBody.toString('utf8'));
        // var title = $('#article > section > section > main > section > section > h1').text();
        // var content = $('#article > section > section > main > section > section > section.post__content--article.protected-content > article').text();

        console.log(queueItem.url);
        
        var $ = cheerio.load(responseBody.toString('utf8'));
        var title = $('meta[property="og:title"]').prop('content');
        if (title) console.log(`>>>>>>>>>>>>> ${title}`);
        
    });

    crawler.start();
});
