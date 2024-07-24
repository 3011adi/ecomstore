import express from "express";
import { Cart } from "../models/itemModel.js";


const router = express.Router();

router.post('/', async (request, response) => {
    try {
        if (!request.body.seller || !request.body.object || !request.body.price || !request.body.image) {
            return response.status(400).send({
                message: 'Please provide all required fields',
            });
        }
        const newCartItem = {
            seller: request.body.seller,
            object: request.body.object,
            price: request.body.price,
            image: request.body.image, // Include image URL in the new cart item
            upi: request.body.upi,
        };
        const cartItem = await Cart.create(newCartItem);
        return response.status(201).send(cartItem);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const cartItems = await Cart.find({});
        return response.status(200).json({
            count: cartItems.length,
            data: cartItems
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

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Cart.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Cart item not found' });
        }

        return response.status(200).send({ message: 'Cart item deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;
