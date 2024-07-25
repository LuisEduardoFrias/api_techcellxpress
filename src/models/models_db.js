//
import { DataTypes } from 'sequelize';
import sequelize from '../libs/db.js';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  user: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export const Capacity = sequelize.define('Capacity', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  rom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ramMemory: {
    type: DataTypes.STRING,
    allowNull: false
  },
  processor: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export const Phone = sequelize.define('Phone', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  imei: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  releaseDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isRemoved: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  timestamps: false
});

Capacity.hasMany(Phone, {
  foreignKey: 'capacity',
  sourceKey: 'id'
});

Phone.belongsTo(Capacity, {
  foreignKey: 'capacity',
  sourceKey: 'id'
});

//await Capacity.sync({ force: true });
//await Phone.sync({ force: true });
//await User.sync();