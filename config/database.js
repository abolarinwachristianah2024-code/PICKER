const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://christyrinwa_db_user:lBtCk1tHh07OxsAe@cluster0.rczvbfm.mongodb.net/').then(() => {
    console.log('Database is connected');

}).catch((error) => {
    console.log('Unable to connect:', error.message)
})
