import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    seller: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    upi: {
      type: String,
      required: true,
    },
    image: { // New image field
      type: String,
      required: true,
    },
  }
);

const cartSchema = mongoose.Schema(
  {
    seller: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    upi: {
      type: String,
      required: true,
    },
    image: { // New image field
      type: String,
      required: true,
    },
  }
);

const UserSchema = mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true,
  },
  password: {
      type: String,
      required: true,
  },
});

export const Item = mongoose.model('Item', itemSchema);
export const Cart = mongoose.model('Cart', cartSchema);
export const User = mongoose.model('User', UserSchema);