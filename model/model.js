'use strict';

const mongoose = require('mongoose');

class Model {
     constructor(schema) {
         this.schema = schema;
     }

     create(record) {
        return this.create(record);
     }

     read(query) {
         if(mongoose.Types.ObjectId.isValid(query)) return this.schema.findById(query);
         else return this.schema.find({username: query});
     }

     update(_id, record) {
         return this.schema.updateOne({_id}, record);
     }

     delete(_id) { 
         return this.schema.deleteOne({_is});
     }
}

    module.exports = Model;