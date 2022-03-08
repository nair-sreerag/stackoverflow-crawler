
const Promise = require('bluebird');
const config = require('../config')
const parser = require('./parse_html');
const fetchWebpage = require('./fetch_html');
const db = require('../db');
const logger = require('../log');

const BASE_URL = 'https://stackoverflow.com'
const QUESTIONS_URL = `${BASE_URL}/questions`;

exports.scrapeSOF = async (page) => {
    try {

        page = page || 1;

        const mainQuestionsHtmlPage  = await fetchWebpage.fetchWholeWebpage(QUESTIONS_URL, page);

        const { linkData, hasNextPage } = await parser.parseMainListingAndExtractLinks(mainQuestionsHtmlPage)

        logger.info({ linkData, hasNextPage }, 'main page scraping response');

        await Promise.map(linkData, async (linkObject) =>{

            const { link, questionId } = linkObject;

            const issueDetailsHtml = await fetchWebpage.fetchWholeWebpage(`${BASE_URL}${link}`)

            const { relatedSectionLinks, upvoteCount, answerCount, datetime } = await parser.parseHtmlAndExtractRelatedLinks(issueDetailsHtml);
            
            const { id: insertId } = await db.commitUrlFoundInQuestionsPage({ url: link, answer_count: answerCount, question_id: questionId, datetime_asked: datetime, upvote_count: upvoteCount });
            
            logger.info({ insertId, link, questionId, upvoteCount, answerCount } , 'committing links found in page')
            await Promise.map(relatedSectionLinks, async (link) => {
                await db.commitUrlFoundInRelatedSection({ found_in: insertId, url: link });
            }) 

        }, {
            concurrency: config.REQUEST_CONCURRENCY,
        })

        hasNextPage;

        if(hasNextPage){
            // call again with new page
            return exports.scrapeSOF(page + 1);
        } else {
            // time to unwind
            return true;
        }

    }
    catch(err) {
        throw err;
    }
};

