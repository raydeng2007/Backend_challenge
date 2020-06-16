const express = require('express');

const { asyncHandler } = require('../utils/route');
const dbModels = require('../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const results = await dbModels.colour.findAll({
        where: {},
    });

    return res.json(results);
}));


module.exports = router;
