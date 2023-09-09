import express from "express"
import userData from '../models/userSchema.js';


const router = express.Router()


//get all Users operating
router.get('/read', async (req, res)=>{

    try{
    const allUsers = await userData.find();
    if(allUsers){
        if(allUsers.length > 0){
            res.status(201).json({msg:allUsers})
            console.log("ALl users are ", allUsers)
        }
        else{
            res.status(401).json({msg:"No Users Present"})
            console.log("EMpty Users")
        }
    }
    }
    catch(err){
        res.status(401).json({msg:"Catch Caught  Error occurred "})
    }
})

//creating operation
router.post('/register', async (req, res)=>{
    console.log("INSUDEE BAKCEND BODY IS ", req.body)
    const {name, email, password} = req.body
    const user = {
        name, email, password
    }
    try{
    const alreadyExisting = await userData.findOne({email:email})
    

    if(alreadyExisting){
        res.status(401).json({msg:"User Already Exists"})
        console.log("Already exists ", alreadyExisting)
    }
    else{
        try{
         const userAdded = await userData.create(user)
         res.status(201).json({msg:"User created"})
         console.log("User Created ", userAdded)
        }
        catch(err){
            res.status(401).json({msg:"Error Occurred "})
        }
    }
    }
    catch(err){
        res.status(401).json({msg:"Error Occurred "})
    }
})


//getting one User according to ID
router.get('/:id',async (req, res)=>{
    console.log("Backend mein aagaya yess ID  IS ",req.params.id);
    try{
        const userFound = await userData.findOne({_id:req.params.id});
        if(userFound){
            res.status(201).json({msg:userFound})
            console.log(`users with id ${req.params.id} is`, userFound)
        }
        else{
            res.status(401).json({msg:"No user found"})
            console.log("No user found")
        }
    }
    catch(err){
        res.status(401).json({msg:"Error Occurred "})
    }
})

//updating specific User by id
router.patch('/edit/:id', async (req, res)=>{   
    const {id} = req.params
    try {
        const updatedUser = await userData.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        console.log("user succcesfully updated ", updatedUser);
        
        res.status(201).json({msg:updatedUser});

      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})

//deleting by Id
router.delete('/:id',async (req, res)=>{
    console.log("Backend body is ", req.body)
    try{
        const userFound = await userData.find({_id:req.params.id})
        if(userFound){
            const deletedUser = await userData.findByIdAndDelete({_id:req.params.id})
            res.status(201).json({msg:"User Deleted Successful ",deletedUser })
            console.log("User Deleted Successful", deletedUser)
        }
        else{
            res.status(401).json({msg:"No user found"})
            console.log("No user found")
        }
    }
    catch(err){
        res.status(401).json({msg:"Error Occurred "})
    }
})

export default router
