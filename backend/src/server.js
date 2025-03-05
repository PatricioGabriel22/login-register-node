import express from 'express'

import { PORT, SALT_ROUNDS } from './settings/config.js'
import { validateUserData } from './functions/validationFunctions.js'
import { userZodSchema } from './schemas/zod/zod.schema.js'
import { connectDB } from './settings/DB.js'
import userSchema from './schemas/user.schema.js'


import bcrypt from 'bcrypt'

const server = express()

server.use(express.json())

connectDB()


server.get('/',(req,res) => {

    res.send("<h1>All working</h1>")
})


server.get('/protected',(req,res)=>{})



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
    
        res.status(200).json({message:`Bienvenido, ${loginUserTarget.username}`})

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
server.post('/logout',(req,res)=>{})





server.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
