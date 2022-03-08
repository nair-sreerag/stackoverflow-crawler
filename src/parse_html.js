const cheerio = require('cheerio');
const logger = require('../log');


exports.parseHtmlAndExtractRelatedLinks = (htmlResponse) => {
        return new Promise((resolve, reject) => {
            const $ = cheerio.load(htmlResponse);

            const relatedSectionLinks = $('div[class="related js-gps-related-questions"]').children().map(function(idx, element){
                const relLink = $(element).find('div > a.question-hyperlink').attr('href');
                return relLink;

            })

            const upvoteCount = $('#question > div.post-layout > div.votecell.post-layout--left > div > div.js-vote-count.flex--item.d-flex.fd-column.ai-center.fc-black-500.fs-title').attr('data-value')
            const answerCount = $('#answers-header > div > div.flex--item.fl1 > h2').attr('data-answercount');
            const datetime = $('#content > div > div.inner-content.clearfix > div.d-flex.fw-wrap.pb8.mb16.bb.bc-black-075 > div:nth-child(1) > time').attr('datetime')

            // logger.info({ upvoteCount, answerCount, datetime })

            // logger.info({ relatedLinks });
            // return resolve({ relatedLinks,  });
            return resolve({ relatedSectionLinks, upvoteCount, answerCount, datetime });

        });
};

exports.parseMainListingAndExtractLinks = (htmlResponse) => {
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(htmlResponse)
        
        // const mainTable = $('#questions')
        
        const linkData = []; 
        
        $('div[id="questions"]').children().map(function(idx, element){
                const link = $(element).find('div > div.s-post-summary--content > h3 > a').attr('href');
                // logger.info({ link }, 'title');

                const questionIdRegExp = new RegExp(/questions\/(\d+)\/(.*)/);
                let questionId = questionIdRegExp.exec(link);

                questionId = questionId[1] || null;

                linkData.push({ link, questionId });
        });

        // logger.info({ linkData }, '-----')

        let hasNextPage;
        $('div[class="s-pagination site1 themed pager float-left"]').children().each(function(idx, element) {
            hasNextPage = $(element).attr('rel') === 'next'
        });

        // const currentPageNumber = $()

        return resolve({ linkData, hasNextPage });
    });
};

