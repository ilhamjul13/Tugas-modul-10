module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define("devices", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        sensor_spesification: {
            type: Sequelize.TEXT
        },
        gps_location_latitude: {
            type: Sequelize.DECIMAL(10, 6)
        },
        gps_location_longitude: {
            type: Sequelize.DECIMAL(10, 6)
        },
        device_notification: {
            type: Sequelize.BOOLEAN
        }
    });

    return Device;
}