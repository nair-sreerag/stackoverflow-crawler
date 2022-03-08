const axios = require('axios').default;
const logger = require('../log');
const BASEURL = 'https://stackoverflow.com'

const axiosInstance = axios.create({
    baseURL: BASEURL,
    method: 'GET'
})


// test imports;

const parser = require('./parse_html');
// test imports;


exports.fetchWholeWebpage = (url, page = 1) => {
    logger.info({ url, page }, '[fetchWholeWebpage]');
    return axiosInstance.get(url, {
        params: {
            tab: 'oldest',
            page
        }
    })
        .then(({ data }) => {
            // logger.info({ data }, 'received data for link - ', url);
            return data;
        })
        .catch((err) => {
            throw err;
        })
};


// exports.fetchWholeWebpage('https://stackoverflow.com/questions')
// .then((body) => {
//     return parser.parseMainListingAndExtractLinks(body);
// })
// .then((r) => {
//     // logger.info({ r });
// })
// .then(() => {
//     logger.info('done!')
// })
// .catch((err) => {
//     logger.error({ err }, 'some error while fetching and parsing the whole page');
//     throw err
// })