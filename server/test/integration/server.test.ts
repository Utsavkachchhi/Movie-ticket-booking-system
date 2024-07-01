import request from 'supertest';
// import { SHUTDOWN } from '../../src/server.js';
import { app } from '../../src/app.js';

describe('Application', () => {
    it('Starts and has the proper test environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        // expect(app).toBeDefined();
    }, 10000);
});

// afterAll((done) => {
//     SHUTDOWN(done);
// });

// it('Returns all options allowed when called from the HTTP method options', async () => {
//     const response = await request(app).options('/');

//     expect(response.status).toBe(200);
//     expect(response.headers['access-control-allow-methods']).toBe('PUT, POST, PATCH, DELETE, GET');
// }, 10000);

// it('Returns 404 when the route requested is not found.', async () => {
//     const response = await request(app).get('/a/cute/route/that/does/not/exist/');

//     expect(response.status).toBe(404);
// }, 10000);
