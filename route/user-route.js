'use strict';
const express = require('express');
const router = express.Router();
const modelFinder = require('../model/model.js');
const userSchema = require('../model/user-schema.js');

const ModelUser = new modelFinder(userSchema);

router.get('/user', async (req, res, next) => {
  let results = await ModelUser.readByQuery({});
  res.send(results)
});


router.get('user/:_id', async (req, res, next) => {
  let record = await ModelUser.read(req.params._id);
  res.send(record);
});


router.post('/user', async (req, res, next) => {
  let record = await ModelUser.create(req.body)

  res.send(record);
});


router.put('user/:_id', async (req, res, next) => {
  console.log('rec', req.body)
  let record = await ModelUser.update(req.params._id, req.body)
  console.log('update', record)
  res.send(record);
});


router.delete('user/:_id', async (req, res, next) => {
  let record = await ModelUser.delete(req.params._id);
  console.log('delete in user routes', record);
  res.send(record)
});
 
module.exports = router;




