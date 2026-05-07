const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB Connected");
    app.listen(process.env.PORT, ()=>{
        console.log('Server running on ${process.env.PORT}');

    });

});