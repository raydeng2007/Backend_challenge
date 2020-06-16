const express = require('express');

const { asyncHandler } = require('../utils/route');
const dbModels = require('../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const results = await dbModels.warranty.findAll({
    include: [{
      model: dbModels.vehicle
    }]
  });

  return res.json(results);
}));

router.post('/', asyncHandler(async (req, res) => {
    const {price,name} = req.body;
    const warranty = await dbModels.warranty.create({
        price: price,
        name: name,
    });
    return res.status(201).json(warranty);
}));

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const warranty_id = req.params.id;

        const { price, name } = req.body;

        const warranty = await dbModels.warranty.update(
            { price: price, name: name },
            { where: { id: warranty_id } }
        );

        return res.status(201).json(warranty);
    })
);


router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const warranty_id = req.params.id;

        const warranty = await dbModels.warranty.destroy({
            where: {
              id:warranty_id
            },
        });

        return res.status(201).json(warranty)
    })
);

module.exports = router;
