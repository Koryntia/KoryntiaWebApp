const mongoose = require("mongoose");
async function connection() {
    try {
        console.log("Connecting to MongoDB...", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log("Connection has been created successfully");
    } catch (e) {
        console.log("Error: => ", e.message);
    }
}
connection();
