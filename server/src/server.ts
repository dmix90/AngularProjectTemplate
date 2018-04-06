import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import schema from '@data/schema';

const bootstrap = async () => {
    await createConnection().then(res => {
        if (res.isConnected) {
            console.log(`:::Succcessfully connected to the ${res.options.type} <${res.options.database}> database:::`);
        }
    }).catch(err => {
        console.log(`:::Database error::: -> ${err}`);
    })

    const server = express();
    const port = 4201;

    server.use(bodyParser.json());

    server.use('/graphql', cors(), graphqlHTTP({
        schema: schema,
        graphiql: true,
    }))

    server.listen(port, () => {
        console.log(`:::Express server is listening on port: ${port}:::`)
    })
}
bootstrap();