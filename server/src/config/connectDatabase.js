const { Sequelize } = require('sequelize');

const password = process.env.DB_PASSWORD || null
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, password, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    // dialectOptions: {
    //     ssl: {
    //         require: true, // This will help you. But you will see nwe error
    //         rejectUnauthorized: false // This line will fix new error
    //     }
    // },
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDatabase