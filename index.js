const axios = require('axios');
const xmlParser = require('xml2js');
const cheerio = require('cheerio');

axios
    .get('http://pox.globo.com/sitemap/g1/2020/04/07_1.xml')
    .then(function (response) {
        xmlParser.parseString(response.data, async (err, result) => {
            var urls = result.urlset.url.map((r) => r.loc);

            for (let i = 0; i < urls.length; i++) {
                const u = urls[i];
                var url = u[0];
                console.log(url);
                var httpResponse = await axios.get(url);
                var $ = cheerio.load(httpResponse.data);
                var title = $('meta[property="og:title"]').prop('content');
                var imageUrl = $('meta[property="og:image"]').prop('content');
                var pubDate = $(
                    'body > div.glb-grid > main > div.content__signa-share > div.content__signature > div > div > p.content-publication-data__updated > time'
                ).text();

                var news = {
                    title: title,
                    imageUrl: imageUrl,
                    pubDate: pubDate,
                    url: url,
                };

                console.log(news);
            }
        });
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
    });
