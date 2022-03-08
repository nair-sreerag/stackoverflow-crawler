const logger = require('../log');
const { Ref_Storage, Urls } = require('../models/Urls');
const Knex = require('knex');
const knex = Knex(require('../knexfile'));


exports.commitUrlFoundInQuestionsPage = async ({ url, upvote_count, answer_count, question_id, datetime_asked }) => {
    logger.info({ url, upvote_count, answer_count, question_id, datetime_asked }, '[commitUrlFoundInQuestionsPage]');
    try {
        const responseObj = await Urls.query().insert({
            url,
            upvote_count,
            answer_count,
            question_id,
            datetime_asked
        })
        .onConflict('url')
        .merge({
            ref_count: knex.raw("?? + ?", ["ref_count", 1]),

            // will not unset them if undefined value is received... it means they can be null at first, some values
            // can be inserted later (which will update these fields) and later on when 
            // these values again are undefined and committed, knex doesnt unset these values;
            
            answer_count,
            upvote_count,
            question_id,
            datetime_asked
        })

        // logger.info('done!', { obj: responseObj, u: responseObj.upvote_count });
        return responseObj;

    }
    catch(err) {
        throw err;
    }
};


exports.commitUrlFoundInRelatedSection = async({ url, found_in }) => {
    logger.info({ url, found_in }, '[commitUrlFoundInRelatedSection]');
    try {

        const dbResponse = await Ref_Storage.query().insert({
            found_in,
            url,
        })

        logger.info({ dbResponse }, 'done inserting in the ref table');

        return dbResponse;

    }
    catch(err) {
        throw err
    }
};



// const { Model } = require('objection')

// const Knex = require('knex');

// const knex = Knex(require('../knexfile').development)

// Model.knex(knex)

// exports.commitUrlFoundInQuestionsPage({ url: 'aaaaaaa2', 
// // upvote_count: 100, 
// // answer_count: 100,
// // question_id: 1 
// })
// .then(() => {
//     logger.info('yooooo')
//     process.exit(0);
// })
// .catch((err) => {
//     logger.info({ err }, err)
// })