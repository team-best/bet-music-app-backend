'use strict';
const express = require('express');
const router = express.Router();
const modelFinder = require('../model/model.js');
const userSchema = require('../model/user-schema.js');

const ModelUser = new modelFinder(userSchema);
/**
 * This route allows you to read user
 * @route GET /user
 * @group user
 * @returns {object} 200 - get user
 */
router.get('/user', async (req, res, next) => {
  let results = await ModelUser.read({});
  res.send(results);
});

/**
 * This route allows you to read a single user
 * @route GET /user/{id}
 * @group user
 * @returns {object} 200 - get user
 */
router.get('/user/:_id', async (req, res, next) => {
  let record = await ModelUser.read(req.params._id);
  res.send(record);
});


/**
 * This route allows you to create user in the db
 * @route POST /user
 * @group user
 * @returns {object} 201 - The created object
 * @returns {Error} - If there was an issue creating in the db
 */
router.post('/user', async (req, res, next) => {
  let record = await ModelUser.create(req.body);
  res.send(record);
});


/**
  * This route allows you to update a user to  login in the terminal
 * @route PUT /user/{id}
 * @group user
 * @param {Number} id.path - the id of the field you want to update
 * @returns {object} 200 - The updated object
 * @returns {Error} - If there was an issue updating in the db
 */

router.put('/user/:_id', async (req, res, next) => {


  let record = await ModelUser.update(req.params._id, req.body);
  res.send(record);
});

/**
  * This route allows you to delete a user
 * @route DELETE /user/{id}
 * @group user
 * @param {Number} id.path - the id of the field you want to update
 * @returns {object} 200 - delete user by id
 */
router.delete('/user/:_id', async (req, res, next) => {
  let record = await ModelUser.delete(req.params._id);
  res.send(record);
});

module.exports = router;




