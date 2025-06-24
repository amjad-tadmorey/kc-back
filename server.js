const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log(err);

    console.log('uncaught Exception, shuting down');
    process.exit(1)
})

dotenv.config({ path: './.env' });
const app = require('./app');
const { default: mongoose } = require('mongoose');

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,

    // useFindAndModify: false,
    // useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'))


const port = process.env.PORT
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...${process.env.NODE_ENV}`);
})

process.on('unhandledRejection', (err) => {
    console.log('unhandled Rejection, shuting down', err);
    server.close(() => {
        process.exit(1)
    })
})

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
