
const { Schema, model } = require('mongoose');

const ProductSchema = Schema({

  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: [true, 'State is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String
  },
  avaliable: {
    type: Boolean,
    default: true
  },
  img: {
    type: String
  }

});

// toJSON built-in method
ProductSchema.methods.toJSON = function() {
  const { __v, state, ...data } = this.toObject(); // toObject built-in method
  return data;
};

module.exports = model( "Product", ProductSchema );