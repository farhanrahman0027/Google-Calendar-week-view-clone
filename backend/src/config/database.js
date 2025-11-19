const mongoose=require ('mongoose');
reruire('dotenv').config();

const connectDB=async()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,

        });
        console.log(`Mongodb is connected successfully:${conn.connection.host}`);
    }
    catch(error){
        console.log(`error:${error.message}`);
        process.exit(1);
    }
};
module.exports=connectDB;