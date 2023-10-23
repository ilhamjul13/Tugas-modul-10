const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
        dbConfig.DATABASE,
        dbConfig.USER,
        dbConfig.PASSWORD,
        {
            host: dbConfig.HOST,
            dialect: dbConfig.DIALECT,
            port: dbConfig.PORT,
            define: {
                timestamps: false,
                freezeTableName: true
            },
            logging: true
        }
    );
const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

db.deviceModel = require("./device.model")(sequelize, Sequelize);

module.exports = db;