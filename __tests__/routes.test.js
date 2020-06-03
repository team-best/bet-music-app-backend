const route = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(route.server);
describe('user routes work', () => {
  it('GET/User', async () => {
    let usersRoute = {
      username : 'sonia',
      password : 'sonia',
    }
   let results =  await mockRequest.post('/user').send(usersRoute).set('Accept', 'application/json');
    let getResponse = await mockRequest.get('/user')
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toBeTruthy();
  });
  it('GET/:_id', async () => {
    let usersRoute = {
      username : 'sue',
      password : 'sue123',
    }
    let result = await mockRequest.post('/user').send(usersRoute).set('Accept', 'application/json');
    let reasultById = await mockRequest.get(`/user/${result.body._id}`).set('Accept', 'application/json');
    expect(reasultById.status).toBe(200);
    expect(reasultById.body).toBeTruthy();
  });
  it('POST/User', async () => {
    let usersRoute = {
      username : 'ted',
      password : 'ted123',
    }
    let resultPost = await mockRequest.post('/user').send(usersRoute).set('Accept', 'application/json');
    expect(resultPost.status).toBe(200);
    expect(resultPost.body).toBeTruthy();
});
it('PUT/UserById', async () => {
  let usersRoute = {
    username : 'ben',
    password : 'ben123',
  }
  let resultPost = await mockRequest.post('/user').send(usersRoute).set('Accept', 'application/json');
  let updateById = await mockRequest.put(`/user/${resultPost.body._id}`).send(usersRoute).set('Accept', 'application/json');
  expect(updateById.status).toBe(200);
  expect(updateById.body).toBeTruthy();
})
it('DELETE/UserById', async () => {
  let usersRoute = {
    username : 'ted',
    password : 'ted123',
  }
  let resultPost = await mockRequest.post('/user').send(usersRoute).set('Accept', 'application/json');

  let deleteById = await mockRequest.delete(`/user/${resultPost.body._id}`).send(usersRoute).set('Accept', 'application/json');
  expect(deleteById.status).toBe(200);
  expect(deleteById.body).toBeTruthy();
})
});