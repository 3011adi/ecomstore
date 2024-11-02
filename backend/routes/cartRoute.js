import express from "express";
import { Cart, User } from "../models/itemModel.js";


const router = express.Router();

router.post('/:userId', async (request, response) => {
    try {
        const { userId } = request.params;
        const { seller, object, price, image, upi } = request.body;

        if (!seller || !object || !price || !image || !upi) {
            return response.status(400).send({
                message: 'Please provide all required fields',
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).send({ message: 'User not found' });
        }

        let cart = await Cart.findById(user.cart);
        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
            user.cart = cart._id;
            await user.save();
        }

        cart.items.push({ seller, object, price, image, upi });
        await cart.save();

        return response.status(201).send(cart);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/:userId', async (request, response) => {
    try {
        const { userId } = request.params;
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).send({ message: 'User not found' });
        }

        const cart = await Cart.findById(user.cart);
        if (!cart) {
            return response.status(404).send({ message: 'Cart not found' });
        }

        return response.status(200).json({
            count: cart.items.length,
            data: cart.items
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const cartItem = await Cart.findById(id);
        return response.status(200).json(cartItem);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        if (!request.body.seller || !request.body.object || !request.body.price) {
            return response.status(400).send({
                message: 'Please provide all required fields',
            });
        }

        const { id } = request.params;
        const result = await Cart.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Cart item not found' });
        }

        return response.status(200).send({ message: 'Cart item updated', data: result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:userId/:itemId', async (request, response) => {
    try {
        const { userId, itemId } = request.params;
        
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).send({ message: 'User not found' });
        }

        const cart = await Cart.findById(user.cart);
        if (!cart) {
            return response.status(404).send({ message: 'Cart not found' });
        }

        // Find and remove the specific item from the cart items array
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();

        return response.status(200).send({ message: 'Item removed from cart' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});




export default router;
