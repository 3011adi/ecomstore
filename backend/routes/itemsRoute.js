import  express  from "express";

import { Item } from "../models/itemModel.js";

const router =express.Router();

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.seller ||
            !request.body.object ||
            !request.body.price ||
            !request.body.image // check if image URL is provided
        ) {
            return response.status(400).send({
                message: 'send all',
            });
        }
        const newItem = {
            seller: request.body.seller,
            object: request.body.object,
            price: request.body.price,
            image: request.body.image, // add image URL to the new item
        };
        const item = await Item.create(newItem);
        return response.status(201).send(item);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



router.get('/',async(request,response) => {
   try{
    const items =await Item.find({});
    return response.status(200).json({
        count: items.length,
        data: items});
   }
   catch(error)
   {
    console.log(error.message);
    response.status(500).send({message:error.message});
   }
});

router.get('/:id',async(request,response) => {
    try{
        const { id}= request.params;
     const item =await Item.findById(id);
     return response.status(200).json(item);
    }
    catch(error)
    {
     console.log(error.message);
     response.status(500).send({message:error.message});
    }
 });

 router.put( '/:id',async(request,response) =>{
    try{
        if(
            !request.body.seller ||
            !request.body.object ||
            !request.body.price
         ){
             return response.status(400).send({
                 message:'send all',
             });
         }

         const {id} = request.params;

         const result =await Item.findByIdAndUpdate(id,request.body);

         if(!result){
            return  response.status(404).json({message:'not found'});
         }

         return  response.status(200).send({message:'updated'});

    }catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
 });

 router.delete('/:id',async(request,response)=>{
     try{
        const {id} = request.params;

         const result = await Item.findByIdAndDelete(id,request.body);

         if(!result){
            return  response.status(404).json({message:'not found'});
         }

         return  response.status(200).send({message:'deleted'});



     }catch(error)
     {
        console.log(error.message);
        response.status(500).send({message:error.message});
     }
 });

 export default router;