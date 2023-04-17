const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose
            .connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        console.log(`MongoDB Connection Successful: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error Database Connection Failed: ${error}`)
    }
}

const connectDB2 = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => { console.log(`MongoDB Connection Successful`) })
        .catch((error) => { console.log(`Error Database Connection Failed: ${error}`); process.exit(1); })
}

module.exports = connectDB2