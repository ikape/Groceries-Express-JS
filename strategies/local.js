const passport = require('passport')
const strategy = require('passport-local')
const user = require('../database/schemas/usersSchema')
const { comparePassword } = require('../utility/helper')

passport.serializeUser((user, done)=> {
    console.log('serializing User....')
    console.log(user);
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=>{
    console.log('Deserializing User')
    console.log(id)
    try {
        const user = await user.findById(id)
        if (!user) throw new Error('User not found')
        console.log(user);
        done(null, user)
    } catch (err) {
        console.log(err);
        done(err, null)
    }
})

passport.use(
  new strategy(
    {
        usernameField: "email",
    }, 
    async (email, password, done)=>{
     console.log(email)
     console.log(password)
        try { 
        if (!email || !password) throw new Error('Bad Request. Missing credentials')
        const userDB = await user.findOne({email})
        if(!userDB) throw new Error('User not found')
        const isvalid = comparePassword(password, userDB.password)
        if(isvalid){
    console.log('Authenticated Successfully');
    done(null, userDB)
    }else{
    console.log('Invalid Authentication');
    done(null, null)
    }
   } catch(err){
    console.log(err);
    done(err, null)
   }
  }
 )
)