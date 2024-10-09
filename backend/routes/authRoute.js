import express from "express";
import { User } from "../models/itemModel.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Signup Route
router.post('/', async (request, response) => {
  try {
    if (!request.body.name || !request.body.email || !request.body.password) {
      return response.status(400).send({
        message: 'Please provide all required fields',
      });
    }
    
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    
    const newsign = {
      name: request.body.name,
      email: request.body.email,
      password: hashedPassword,
    };
    
    const sign = await User.create(newsign);
    return response.status(201).send(sign);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Login Route
router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    
    // Validate input
    if (!email || !password) {
      return response.status(400).send({
        message: 'Please provide both email and password',
      });
    }
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).send({
        message: 'User not found',
      });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(400).send({
        message: 'Invalid credentials',
      });
    }
    
    // If login is successful
    return response.status(200).send({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;