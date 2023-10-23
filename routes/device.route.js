const express = require("express");
const { deviceModel } = require("../models");
const { check, validationResult } = require('express-validator');
const router = express.Router()

router.get('/device', async (req, res) => {
    const dataDevice = await deviceModel.findAll()

    res.status(200).json({
        message: "Berhasil Mendapatkan Semua Data Device",
        data: dataDevice,
    });
})

router.get('/device/:id', async (req, res) => {
    const id = req.params.id

    const dataDevice = await deviceModel.findOne({
        where: {
            id :id,
        },
    });

    if (!dataDevice) {
        res.status(404).json({message: "Data Tidak Ditemukan"})
    }

    return res.status(200).json({
            message: "Berhasil Mendapatkan Data",
            data: dataDevice,
    });
});

router.post('/device',
    [check('name').notEmpty(),
    check('name').custom(async (value) => {
        const device = await deviceModel.findOne({ where: { name : value } });
        if (device) {
            return Promise.reject('Nama Perangkat Sudah Digunakan');
        }
        return true;
    })
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    
    const {name, location, type, sensor_spesification, 
            gps_location_latitude, gps_location_longitude,
            device_notification} = req.body;
    
    const saveDevice = await deviceModel.create({
        name: name,
        location: location,
        type: type,
        sensor_spesification: sensor_spesification,
        gps_location_latitude: gps_location_latitude,
        gps_location_longitude: gps_location_longitude,
        device_notification: device_notification
    });
    
    if (!saveDevice) {
        return res.status(400).json({message: "Gagal Menambahkan Data Device"})
    };

    return res.status(201).json({
            message: "Berhasil Menambahkan Data Device",
            data: saveDevice,
    });
});

router.put('/device/:id', async (req, res) => {
    const id = req.params.id

    const {name, location, type, sensor_spesification, 
            gps_location_latitude, gps_location_longitude,
            device_notification} = req.body
    
    const updateDevice = await deviceModel.update({
        name: name,
        location: location,
        type: type,
        sensor_spesification: sensor_spesification,
        gps_location_latitude: gps_location_latitude,
        gps_location_longitude: gps_location_longitude,
        device_notification: device_notification
    }, {
        where: {
            id: id,
        },
    });

    if (!updateDevice) {
        return res.status(400).json({
                message: "Gagal Mengubah Data Device",
                data: {},
        });
    }
        
    const dataDevice = await deviceModel.findOne({
        where: {
            id :id,
        },
    });

    return res.status(201).json({
            message: "Berhasil Mengubah Data Device",
            data: updateDevice
    });
});

router.delete('/device/:id', async (req, res) => {
    const id = req.params.id

    const deleteDevice = await deviceModel.destroy({
        where: {
            id: id,
        },
    });

    if (!deleteDevice) {
        return res.status(400).json({
                message: "Gagal Menghapus Data Device",
                data: {},
        });
    }

    return res.status(200).json({
        message: "Berhasil Menghapus Data Device",
        data: deleteDevice
    });
}); 

module.exports = router;