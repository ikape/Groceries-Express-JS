const mongoose = require('mongoose')


mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL)
.then(()=> console.log("Connected to Groceries DataBase"))
.catch(error => console.log(error))

module.exports 