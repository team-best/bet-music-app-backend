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
               console.log('Error to creating record');

           }
               
     }
     async read(_id){
         try{
             let record = await this.schema.findById({_id});
             return record;
         }catch (e){
             console.log('cannot find user id')
         }
     }

     read(query) {
         if(mongoose.Types.ObjectId.isValid(query)) return this.schema.findById(query);
         else return this.schema.find(query);
     }

     async update(_id, record) {
         try{
             let result = await this.schema.findByIdAndUpdate(_id, record);
             return result;
         }catch (e){
             console.error('error on update')
         }
     }

     async delete(_id) { 
         try{
            let record = await this.schema.findByIdAndDelete({_id});
            return record;
         }catch (e) {
             console.log('cannot delete user by id')
         }
     }
}

    module.exports = Model;