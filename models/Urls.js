const { Model } = require('objection');


class Urls extends Model {
    static get tableName(){
        return 'urls';
    }
}

class Ref_Storage extends Model {
    static get tableName(){
        return 'ref_storage';
    }
}

module.exports = {
    Urls,
    Ref_Storage
};