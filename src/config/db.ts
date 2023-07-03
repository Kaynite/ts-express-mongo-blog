import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.set('strictQuery', false);

    try {
        await mongoose.connect(process.env.MONGODB_URI ?? "", { dbName: "blog" })
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;