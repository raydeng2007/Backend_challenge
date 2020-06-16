const fs = require('fs');
const promisify = require('es6-promisify');

// Helper functions
function foreignKey(DataTypes, model, onDelete, nullable) {
  // Default to nullable - only turn off allowNull if false is explicitly
  // supplied by the caller
  const allowNull = !!nullable || (!nullable && nullable !== false);

  return {
    type: DataTypes.INTEGER,
    allowNull,
    references: {
      model,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete,
  };
}

function primaryKey(DataTypes) {
  return {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  };
}

async function setDeleteAction(queries, table, foreignTable, foreignKeyName, action) {
  console.log(`Setting constraint on ${table} for ${foreignTable}`);

  // Raw sql is required - it seems our version of sequelize does not support
  // addConstraint/removeConstraint(?)
  await queries.sequelize.query(`
    ALTER TABLE "${table}"
      DROP CONSTRAINT "${table}_${foreignKeyName}_fkey",
      ADD CONSTRAINT "${table}_${foreignKeyName}_fkey"
        FOREIGN KEY ("${foreignKeyName}")
        REFERENCES "${foreignTable}"(id)
        ON UPDATE CASCADE
        ON DELETE ${action};
  `);
}

function tableDate(DataTypes) {
  return {
    type: DataTypes.DATE,
    allowNull: false,
  };
}

async function addEnumValue(options) {
  const {
    tableName,
    columnName,
    enumValue,
    queryInterface,
    enumName = `enum_${tableName}_${columnName}`,
  } = options;
  // Note: Transactions not allowed -> ALTER TYPE ... ADD cannot run inside a transaction block
  await queryInterface.sequelize.query(`ALTER TYPE "${enumName}" ADD VALUE '${enumValue}';`);
}

// Note: This function won't work on AWS. Enums can only be removed by the super user.
async function removeEnumValue(options, sequelizeOptions) {
  const {
    tableName,
    columnName,
    enumValue,
    queryInterface,
    enumName = `enum_${tableName}_${columnName}`,
  } = options;

  await queryInterface.sequelize.query(`
    DELETE FROM pg_enum WHERE enumlabel = '${enumValue}'
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = '${enumName}');
  `, sequelizeOptions);
}

async function runSQLFromFile(queryInterface, transaction, file) {
  const fsReadFilePromise = promisify(fs.readFile);
  const rawSQL = await fsReadFilePromise(file, 'utf-8');

  await queryInterface.sequelize.query(rawSQL, { transaction });
}

module.exports = {
  foreignKey,
  primaryKey,
  setDeleteAction,
  tableDate,
  addEnumValue,
  removeEnumValue,
  runSQLFromFile,
};
