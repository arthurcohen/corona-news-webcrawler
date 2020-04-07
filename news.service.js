const axios = require('axios');

function getSitemapFrom(url) {
    return axios.get(url);
}

module.exports = getSitemapFrom;
