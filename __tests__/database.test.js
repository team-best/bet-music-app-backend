'use strict';

const supergoose = require('@code-fellows/supergoose');
const UserModel = require('../model/user-model.js');
const user = new UserModel();


beforeAll(async () => {
    await user.create({
        username: 'Ted',
        password: 'tedpassword',
       
    });

    await user.create({
        username: 'Ben',
        password: 'benpassword',
       
    });
});

describe('Database can create', () => {
    it('for best case', async () => {
        let response = await user.create({
            username: 'Sue',
            password: 'suepassword',
           
        });

        expect(response).toBeTruthy();
        expect(response.username).toBe('Sue');
    });

    it('except when name is taken', async () => {
        let response = await user.create({
            username: 'Sue',
            password: 'suepassword',
            
        });

        expect(response).toBeFalsy();
    });

});
describe('Database can delete', () => {
    it('After successfully creating record', async () => {
        let newRecord = await user.create({
            username: 'sue',
            password: 'suepassword',
           
        });

        let delResult = await user.delete(newRecord._id);
        expect(delResult).toBeTruthy();
    });

    it('An existing record', async () => {
        let records = await user.read({ username: 'Ted' });
        expect(records.length).toBe(1);
        let userId = records[0]._id;

        let deleteResult = await user.delete(userId);
        expect(deleteResult).toBeTruthy();
    });
});
