const express=require('express');

const router=express.Router();
const bcrypt=require('bcrypt');

const user=require('../models/user_schema');

router.post('/auth/register', async (req,res)=>{
    const{username,email,password,role}=req.body;
    console.log(req.body)

    try{
        return res.render('login', { error: 'internal server error' });
        const hashpass=await bcrypt.hash(password,10);
        let new_user=new user({username,email,hashpass,role});
        const data=await new_user.save();
        res.redirect('/auth/login');
        console.log(data);
    }
    catch(err)
    {
        console.log(err);
        // Handle specific error cases, e.g., duplicate key (email/username already exists)
        if (err.code === 11000) {
            return res.render('login', { error: 'email and username already exists' });
        }

        // Handle other errors
        return res.render('login', { error: 'internal server error' });
    }
});


module.exports=router;