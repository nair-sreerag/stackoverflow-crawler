const { Model } = require('objection');


class Urls extends Model {
    static get tableName(){
        return 'urls';
    }
}


module.exports = Urls;