import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { PORT, mangoDBURL } from "./config.js";
import itemsRoute from "./routes/itemsRoute.js";
import cartRoute from "./routes/cartRoute.js"; // Import the cart routes
import authRoute from "./routes/authRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome');
});

app.use('/items', itemsRoute);
app.use('/cart', cartRoute); // Use the cart routes
app.use('/signup',authRoute);

mongoose.connect(mangoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
