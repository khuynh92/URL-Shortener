import express from 'express';

import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';
import noAuth from './middleware/401.js';
import noBody from './middleware/400.js';
import conflict from './middleware/409.js';

import router from './routes/router.js';

let app = express();

//dev & parser middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routes middleware
app.use(router);

//error middleware
app.use(notFound);
app.use(noAuth);
app.use(conflict);
app.use(noBody);
app.use(errorHandler);

let server = false;

module.exports = {
  start: (port) => {
    if(!server) {
      server = app.listen(port, (err) => {
        if(err) { throw err; }
        console.log('Server running on ' + port);
      });
    } else {
      console.log('Server is already running');
    }
  },
  stop: () => {
    server.close(() => {
      console.log('Server has closed');
    });
  },
  server: app,
};