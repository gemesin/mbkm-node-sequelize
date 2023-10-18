module.exports = (sequelize, Sequelize) => {
    const DeviceData = sequelize.define("device_datas", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        device_id: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        humidity: {
            type: Sequelize.STRING
        },
        temperature: {
            type: Sequelize.STRING
        },
    });

    return DeviceData;
}