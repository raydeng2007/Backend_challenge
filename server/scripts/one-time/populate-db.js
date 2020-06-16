const dbModels = require('../../src/db/models');

const warrantyData = [{
  price: 100,
  name: '1 Year',
}, {
  price: 300,
  name: '5 Years',
}];

const vehicleData = [{
  imageUrl: 'https://photos.clutch.ca/a149ed60-46d0-11ea-a344-799b04e32649-extraSmall.jpg',
  name: 'Nissan Rogue',
  price: 22900,
  colour: {
    hexCode: '#FFFFFF',
    name: 'white',
  },
}, {
  imageUrl: 'https://photos.clutch.ca/0feadd60-4e97-11ea-95a5-afde05ef504f-extraSmall.jpg',
  name: 'Honda CR-V',
  price: 22900,
  colour: {
    hexCode: '#FF0000',
    name: 'red',
  },
}, {
  imageUrl: 'https://photos.clutch.ca/8b8a0ac0-54f2-11ea-bef8-11d66368ee7d-extraSmall.jpg',
  name: 'Toyota Carolla',
  price: 13900,
  colour: {
    hexCode: '#000000',
    name: 'black',
  },
  warranty: {
    price: 500,
    name: '10 Years',
  },
}];

(async () => {
  try {
    console.log('Populating database with dummy data...');
    await dbModels.sequelize.transaction(async (transaction) => {
      console.log('Populating vehicles...');
      await Promise.all(vehicleData.map(vehicle => dbModels.vehicle.create(vehicle, {
        transaction,
        include: [
          dbModels.colour,
          dbModels.warranty,
        ],
      })));

      console.log('Populating warranties...');
      await Promise.all(warrantyData.map(warranty => dbModels.warranty.create(warranty, {
        transaction,
      })));
    });
  } catch (error) {
    console.log('Could not complete script because of error...');
    log.error(error);
  }

  console.log('Finished');
  process.exit(0);
})();
