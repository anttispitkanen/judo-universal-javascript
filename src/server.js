'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';


//initialize server, add support for ejs
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//define folder for static assets
app.use(Express.static(path.join(__dirname, 'static')));

//universal routing and rendering
app.get('*', (req, res) => {
    match(
        {routes, location: req.url},
        (err, redirectLocation, renderProps) => {

            //in case of error display error message
            if(err) {
                res.status(500).send(err.message);
            }

            //in case of redirect
            if(redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            //generate React markup for current route
            let markup;

            if (renderProps) {
                markup = renderToString(<RouterContext {...renderProps} />);
            } else {
                markup = renderToString(<NotFoundPage/>);
                res.status(404);
            }

            return res.render('index', {markup});
        }
    );
});


const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
    if(err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
