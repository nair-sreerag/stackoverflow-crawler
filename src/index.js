const logger = require('../log');
const { Model } = require('objection')
const Knex = require('knex');
const knex = Knex(require('../knexfile'))
const { scrapeSOF } = require('./compute');

Model.knex(knex);


const main = async () => {

    try {

        // run a db call here to check if scraping was done before or not;
        return scrapeSOF(0);

    }
    catch(err) {
        throw err
    }

};


main()
.then(() => {
    logger.info('Scraping was successful');
})
.catch((err) => {
    logger.error({ err }, 'Something went wrong while running the script');
    process.exit(1);
})