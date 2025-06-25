const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const orderRouter = require('./routes/orderRoute');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');

const { default: rateLimit } = require("express-rate-limit");
const { default: helmet } = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const { protect } = require("./controllers/authController");
const globalErrorHandler = require('./controllers/errorController')

const app = express()

// app.enable('trust proxy');

// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'))
// }

// app.use(cors({
//     origin: process.env.ORIGIN
// }));

// app.use(helmet());

// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000,
//     message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(cookieParser());
// app.use(compression());


// app.use('/api/v1/users', userRouter)
// app.use('/api/v1/orders', protect, orderRouter)
// app.use('/api/v1/products', protect, productRouter)

// app.use(globalErrorHandler)

module.exports = app