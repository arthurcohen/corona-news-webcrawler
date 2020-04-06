var Crawler = require('simplecrawler');
var cheerio = require('cheerio');


const secure_sources = [
    // 'https://oglobo.globo.com/',
    'https://blogs.oglobo.globo.com/lauro-jardim/post/sao-paulo-vai-estender-quarentena-ate-o-fim-de-abril.html'
];

secure_sources.forEach(source => {
    console.log(`starting fetch from ${source}`);

    var crawler = new Crawler(source)
    
    crawler.maxDepth = 1;
    
    crawler
    .on('fetchcomplete', (queueItem, responseBody, response) => {
        // console.log('I just received %s (%d bytes)', queueItem.url, responseBody.length);
        // console.log('It was a resource of type %s', response.headers['content-type']);
        // console.log(responseBody);
        
        var $ = cheerio.load(responseBody.toString('utf8'));
        // var head = $('body > div.paywall__site-container > main > section.block.four-teasers > div > div > div:nth-child(1) > div:nth-child(1) > div > article > div > h1').text();
        var title = $('#article > section > section > main > section > section > h1').text();
        var content = $('#article > section > section > main > section > section > section.post__content--article.protected-content > article').text();

        console.log(title);
        console.log(content);
    });

    crawler.start();
});
