/* eslint-disable @typescript-eslint/no-var-requires,global-require,no-console,import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import express, { Application, json } from 'express';

const app: Application = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { MONGO_URL, PORT } = process.env;

const startApp = () => {
    const { useRouters } = require('./router');

    app.use(json());
    useRouters(app);

    app.listen(PORT, () => console.log(`SERVER_PORT: ${PORT}`));
};

mongoose.connect(MONGO_URL!, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(startApp)
    .catch(console.log);
