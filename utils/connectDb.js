// Mongoose will be working as our ORM
import mongoose from 'mongoose';
const connection = {}

async function connectDb(){
  if (connection.isConnected){
    // use existing database connection
    console.log("Using existing connection...")
    return;
  }
  // Use new database connection 
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  console.log("Db Connected")
  // How to connect a mongo atlas db to a severless application
  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;