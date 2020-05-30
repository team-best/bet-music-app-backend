'use strict';

const route = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(route.server);

describe('user routes work', () => {
  it('can get the user from the data base', async () => {
    let response = await mockRequest.get('/userRoutes')

    expect(JSON.stringify(response.body)).tobe(JSON.stringify ([
      {
        username: jhon,
        password: jhon,
      }
    ])
    );
    expect(response.status).toBe(200);
  })
})