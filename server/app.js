import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import momoRoutes from './routes/momo.routes';
import cardpayRoutes from './routes/cardpay.routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    return next();
});

app.use('/api', momoRoutes);
app.use('/api', cardpayRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome on Africa XYZ payment integration'
    });
});

app.use((req, res) => {
    res.type('json').status(404).json({
        status: 404,
        errorMessage: '404 Endpoint not found'
    });
});

app.listen(port, console.log(`App is on port ${port}`));


export default app;
