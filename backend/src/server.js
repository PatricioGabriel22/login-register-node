import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './settings/DB.js'

import { PORT, SALT_ROUNDS, SECRET_JWT_KEY } from './settings/config.js'

import userSchema from './schemas/user.schema.js'
import { userZodSchema } from './schemas/zod/zod.schema.js'

import { validateUserData } from './functions/validationFunctions.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'





const server = express()

server.use(express.json())
server.use(cors({ origin: 'http://localhost:5173', credentials: true })) //modificar para produccion
server.use(cookieParser())



connectDB()



server.use((req,res,next)=>{
    const token = req.cookies?.access_token 
    let data = null 
    

    req.session = {user:null}

    
    if(token){

        try{


            data = jwt.verify(token,SECRET_JWT_KEY)
            req.session.user = data
            console.log(data)

        }catch(error){
            console.log(error)
            
        }

    }
    next()

})



server.get('/',(req,res) => {

    res.send("<h1>All working</h1>")
})


server.get('/protected',(req,res)=>{
    res.json({data:req.session.user})
})



server.post('/login',async(req,res)=>{
    const {username,password} = req.body
    try {
        
        const loginUserTarget = await userSchema.findOne({username})

        const isValid = loginUserTarget? bcrypt.compareSync(password,loginUserTarget.password) : false
    
        if(!loginUserTarget || !isValid){
    
            const alerta = loginUserTarget ? 
            `La contraseña no es valida`:
            `El usuario no es valido`
    
    
            return res.status(400).json({message:alerta})
            
        } 
        
        const token = jwt.sign(
            {id:loginUserTarget._id,username:loginUserTarget.username},
            SECRET_JWT_KEY,
            {
                expiresIn:'1h'
            }
        )



        res.status(200)
        .cookie('access_token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:'strict'
        })
        .json({
            message:`Bienvenido, ${loginUserTarget.username}`,
            username:loginUserTarget.username,
            token:token
        })

    



    } catch (error) {
        console.log(error)
    }




   
})



server.post('/register',validateUserData(userZodSchema),async(req,res)=>{
    const {username,email,password} = req.body

    try {
        

        const userDuplciated = await userSchema.findOne({username})
        const emailDuplciated = await userSchema.findOne({email})

        console.log(userDuplciated || emailDuplciated)

        if(userDuplciated || emailDuplciated){

            const alerta = userDuplciated ? 
            `El usuario ${userDuplciated.username} ya esta registrado`:
            `El mail ${emailDuplciated.email} ya esta registrado`


            return res.status(400).json({message:alerta})
            
        } 

        const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS)

        new userSchema({
            username,
            email,
            password:hashedPassword
        }).save()
    
        res.json({message:`Usuario creado, ${username}`})


    } catch (error) {
        console.log(error)
    }



})
server.post('/logout',(req,res)=>{
    res.
        clearCookie('access_cookie')
        .json({message:"logout successful"})
})





server.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
