const {Router, request, response} = require ('express')
const router = Router()
const passport = require('passport')

const User = require('../database/schemas/usersSchema')
const {hashPassword, comparePassword} = require('../utility/helper')



// router.post('/login', async(request, response)=>{
// const {email, password} = request.body;
// // if (username && password){
// //     if(request.session.user){
// //     response.send(request.session.user)
// //     }else{
// //         request.session.user ={
// //             username,
// //         }
// //         response.send(request.session)}
// // }else response.send(401)
// if (!email || !password) return response.send(400);
// const userDB = await User.findOne({email});

// if (!userDB) return response.send(401);
// const isvalid = comparePassword(password, userDB.password)

// if(isvalid){
//     console.log('Authenticated Successfully');
//     request.session.user = userDB
//     return response.send(200)
// }else{
//     console.log('Failed to Authenticate');
//     return response.send(401)
// }
// })


router.post('/login', passport.authenticate('local'), (req,res)=>{
    console.log("logged in");
    res.send(200)
})


router.post('/register', async (request, response)=>{
    const {email} = request.body
    const userDB = await User.findOne({ email})

    if (userDB){
        response.status(400).send ({msg: 'User already exists!'})
    }else {
        const password = hashPassword(request.body.password)
        console.log(password);
        const newUser = await User.create({password,email})
        // newUser.save()
        response.send(201)
    }
})

module.exports = router 