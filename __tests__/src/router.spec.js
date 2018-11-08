'use strict';
require('babel-register');

import supertest from 'supertest';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

const { server } = require('../../src/app.js');

const mockAJAX = supertest(server);

jest.setTimeout(30000);

beforeAll((done) => {
  mockgoose.prepareStorage().then(function () {
    console.log('preparing mockgoose');
    mongoose.connect('mongodb://localhost/lab_19').then(() => done());
  });
});

afterAll((done) => {
  mongoose.disconnect().then(() => {
    console.log('disconnected');
    done();
  }).catch((err) => {
    console.error(err);
    done();
  });
});

afterEach((done) => {
  console.log('resetting');
  mockgoose.helper.reset().then(() => {
    done();
  });
});

describe('router', () => {
  it('should post a url and receive a 6 character hashed reference', () => {
    let obj = {originalURL: 'https://google.com'};
    return mockAJAX.post('/api/v1/urlshortener') 
      .send(obj)
      .then(res => {
        expect(res.body.shortURL).toBeDefined();
        expect(res.status).toEqual(200);
      });
  });

  // it('a get using a 6 character hashed reference should respond with a full url', () => {
  //   let obj = {originalURL: 'https://google.com'};
  //   return mockAJAX.post('/api/v1/urlshortener') 
  //     .send(obj)
  //     .then(res => {
  //       const originalURL = res.body.originalURL;
  //       const shortURL = res.body.shortURL;
  //       console.log(res.body.shortURL);
  //       return mockAJAX.get(`/${shortURL}`)
  //         .then(res => {
  //           console.log(res.body);
  //           expect(res.status).toEqual(200);
  //           expect(res.body).toBe(originalURL);
  //         });
  //     });
  // });
});