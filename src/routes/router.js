import express from 'express';
import fs from 'fs';
import UrlShortener from '../models/url.js';

const router = express();



router.get('/', (req, res, next) => {
  fs.readFile(__dirname + '/../../public/index.html', (err, data) => {
    if (err) {
      next(err);
    } else {
      res.write(data);
      res.status(200);
      res.end();
    }
  });
});

router.post('/api/v1/urlshortener', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    next(400);
  }

  UrlShortener.create(req.body)
    .then(response => {
      res.send(response);
    });
});

router.get(`/:shortURL`, (req, res, next) => {
  if (req.params.shortURL && (!req.params.shortURL.includes('main'))) { 
    UrlShortener.findOne({ shortURL: req.params.shortURL })
      .then(response => {
        if (!response.originalURL.includes('http') || !response.originalURL.includes('https')) {
          return res.redirect(response.originalURL);
        } else {
          return res.redirect(response.originalURL);
        }
      });
  } else {
    fs.readFile(__dirname + '/../../public/index.html', (err, data) => {
      if (err) {
        next(err);
      } else {
        res.write(data);
        res.status(200);
        res.end();
      }
    });
  }
});




export default router;