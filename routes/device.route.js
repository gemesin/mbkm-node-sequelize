const express = require('express');

const { deviceModel } = require("../models");

const router = express.Router();

// deviceModel.hasMany(deviceDataModel, { foreignKey: 'device_id' })

router.get("/device", async (req, res) => {
    const dataDevice = await deviceModel.findAll();

    return res.status(200)
        .json({
            message: "Berhasil mendapatkan semua data device.",
            data: dataDevice,
        });
});

router.get("/device/:id", async (req, res) => {
    const id = req.params.id;

    const dataDevice = await deviceModel.findOne({
        where: {
            id: id,
        },
    });

    if (!dataDevice) {
        return res.status(404)
            .json({
                message: "Data device tidak ditemukan.",
                data: {},
            });
    }

    return res.status(200)
        .json({
            message: "Berhasil mendapatkan data device.",
            data: dataDevice,
        });
});

router.post("/device", async (req, res) => {
    const { code, name, location } = req.body;

    const createDevice = await deviceModel.create({
        code: code,
        name: name,
        location: location,
    });

    if (!createDevice) {
        return res.status(400)
            .json({
                message: "Gagal menambahkan data device.",
                data: {},
            });
    }

    return res.status(201)
        .json({
            message: "Berhasil menambahkan data device.",
            data: createDevice,
        });
});

router.put("/device/:id", async (req, res) => {
    const id = req.params.id;

    const { code, name, location } = req.body;

    const updateDevice = await deviceModel.update({
        code: code,
        name: name,
        location: location,
    }, {
        where: {
            id: id,
        },
    });

    if (!updateDevice) {
        return res.status(400)
            .json({
                message: "Gagal memperbarui data device.",
                data: {},
            });
    }

    const dataDevice = await deviceModel.findOne({
        where: {
            id: id,
        },
    });

    return res.status(200)
        .json({
            message: "Berhasil memperbarui data device.",
            data: dataDevice,
        });
});

router.delete("/device/:id", async (req, res) => {
    const id = req.params.id;

    const deleteDevice = await deviceModel.destroy({
        where: {
            id: id,
        },
    });

    if (!deleteDevice) {
        return res.status(400)
            .json({
                message: "Gagal menghapus data device.",
                data: {},
            });
    }

    return res.status(200)
        .json({
            message: "Berhasil menghapus data device.",
            data: deleteDevice,
        });
});

module.exports = router;