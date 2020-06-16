const express = require('express');

const { asyncHandler } = require('../utils/route');
const dbModels = require('../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const results = await dbModels.vehicle.findAll({
    where: {},
      include: [{
        model:dbModels.colour
      },{
        model:dbModels.warranty
      }]
  });

  return res.json(results);
}));

router.post('/', asyncHandler(async (req, res) => {

    const vehicle = await dbModels.vehicle.create({
        name: req.body.name,
        colourId: req.body.colourId,
        warrantyId: req.body.warrantyId,
        price: req.body.price,
    });

    return res.json(vehicle);
}));

router.get('/:id/relatedVehicles', asyncHandler(async (req, res) => {
    const vehicleId = req.params.id;
    const result = await dbModels.vehicle.findOne({
        where:{
            id: vehicleId,
        }
    });
    const targetPrice = result.price;
    const results = await dbModels.vehicle.findAll({
        where:{
            id: {
                [sequelize.Op.ne]: vehicleId
            },
            price:{
                [sequelize.Op.between]: [targetPrice-1000,targetPrice+1000]
            }
        }
    });

    return res.json(results);
}));


router.get(
    "/:colour",
    asyncHandler( async (req,res) => {
       const colour_id = await  dbModels.colour.find({
           where: {name: req.params.colour}
       });

       const vehicle = await dbModels.vehicle.findAll({
           where: {colourId: colour_id.id},
           include: [{
               model:dbModels.colour
           }]
       });
        return res.status(201).json(vehicle)
    })
);

module.exports = router;
