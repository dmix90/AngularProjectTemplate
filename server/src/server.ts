import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';
import * as cors from 'cors';
import * as compression from 'compression';
import { readFileSync } from 'fs';
import { createServer } from 'spdy';
import { createConnection } from 'typeorm';
import schema from '@data/schema';
import * as path from 'path';

const httpsOptions = {
    key: readFileSync('certificate/server.key'),
    cert: readFileSync('certificate/server.crt')
}

const bootstrap = async () => {
    await createConnection().then(res => {
        if (res.isConnected) {
            console.log(`:::Succcessfully connected to the ${res.options.type} <${res.options.database}> database:::`);
        }
    }).catch(err => {
        console.log(`:::Database error::: -> ${err}`);
    })

    const port = process.env.PORT || 80;
    const httpServer = express();
    const httpsServer = express();

    httpServer.use(bodyParser.json());
    httpServer.use(compression());
    httpServer.get('*', (req, res, next) => {
        if (req.secure) {
            next();
        }
        else {
            console.log(`${req.headers.host}${req.url}`)
            res.redirect('https://' + req.headers.host + req.url);
        }
    })

    httpsServer.use(bodyParser.json());
    httpsServer.use(compression());

    httpsServer.use(express.static('client'));
    httpsServer.get('/', (req, res) => {
        res.sendFile('index.html', { root: 'client/' });
    })
    httpsServer.get('/about', (req, res) => {
        res.sendFile('about.html', { root: 'client/' });
    })
    httpsServer.use('/api', cors(), graphqlHTTP({
        schema: schema,
        graphiql: true,
    }))

    const http2Server = createServer(httpsOptions, httpsServer);

    httpServer.listen(port, () => {
        console.log(`:::Express-HTTP Server is listening on porn: ${port}:::`);
    })
    http2Server.listen(443, (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log(`:::Express-HTTP2 Server is listening on port: 443:::`);
    })
}
bootstrap();