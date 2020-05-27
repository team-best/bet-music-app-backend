'use strict';

const mongoose = require('mongoose');

class Model {
     constructor(schema) {
         this.schema = schema;
     }

     async create(records) {
       
           try {
                let record = new this.schema(records);
                return await record.save();
           } catch (e) {
               console.error('Error to creating record');
               return false;

           }
               
     }

     read(query) {
         if(mongoose.Types.ObjectId.isValid(query)) return this.schema.findById(query);
         else return this.schema.find(query);
     }

     update(_id, record) {
         return this.schema.updateOne({_id}, record);
     }

     delete(_id) { 
         return this.schema.deleteOne({_id});
     }
}

    module.exports = Model;