const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
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

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userModel = require("./user.model.js")(sequelize, Sequelize);
db.deviceModel = require("./device.model.js")(sequelize, Sequelize);
db.deviceDataModel = require("./device-data.model.js")(sequelize, Sequelize);

module.exports = db;