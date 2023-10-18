const express = require('express');

const { deviceModel, deviceDataModel } = require("../models");

const router = express.Router();

// deviceModel.hasMany(deviceDataModel, { foreignKey: 'device_id' })
deviceDataModel.belongsTo(deviceModel, { foreignKey: 'device_id' })

router.get("/device-data", async (req, res) => {
    const dataDeviceData = await deviceDataModel.findAll({
        include: [deviceModel],
    });

    return res.status(200)
        .json({
            message: "Berhasil mendapatkan semua data device data.",
            data: dataDeviceData,
        });
});

router.get("/device-data/:id", async (req, res) => {
    const id = req.params.id;

    const dataDeviceData = await deviceDataModel.findOne({
        include: [deviceModel],
        where: {
            id: id,
        },
    });

    if (!dataDeviceData) {
        return res.status(404)
            .json({
                message: "Data device tidak ditemukan.",
                data: {},
            });
    }

    return res.status(200)
        .json({
            message: "Berhasil mendapatkan data device data.",
            data: dataDeviceData,
        });
});

router.post("/device-data", async (req, res) => {
    const { device_id, humidity, temperature } = req.body;

    const createDeviceData = await deviceDataModel.create({
        device_id: device_id,
        humidity: humidity,
        temperature: temperature,
    });

    if (!createDeviceData) {
        return res.status(400)
            .json({
                message: "Gagal menambahkan data device data.",
                data: {},
            });
    }

    return res.status(201)
        .json({
            message: "Berhasil menambahkan data device data.",
            data: createDeviceData,
        });
});

router.put("/device-data/:id", async (req, res) => {
    const id = req.params.id;

    const { device_id, humidity, temperature } = req.body;

    const updateDeviceData = await deviceDataModel.update({
        device_id: device_id,
        humidity: humidity,
        temperature: temperature,
    }, {
        where: {
            id: id,
        },
    });

    if (!updateDeviceData) {
        return res.status(400)
            .json({
                message: "Gagal memperbarui data device data.",
                data: {},
            });
    }

    const dataDeviceData = await deviceDataModel.findOne({
        where: {
            id: id,
        },
    });

    return res.status(200)
        .json({
            message: "Berhasil memperbarui data device data.",
            data: dataDeviceData,
        });
});

router.delete("/device-data/:id", async (req, res) => {
    const id = req.params.id;

    const deleteDeviceData = await deviceDataModel.destroy({
        where: {
            id: id,
        },
    });

    if (!deleteDeviceData) {
        return res.status(400)
            .json({
                message: "Gagal menghapus data device data.",
                data: {},
            });
    }

    return res.status(200)
        .json({
            message: "Berhasil menghapus data device data.",
            data: deleteDeviceData,
        });
});

module.exports = router;