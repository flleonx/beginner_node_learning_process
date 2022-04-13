const mongoose = require('mongoose');

const dbConnection = async () => {

  try {
    
    await mongoose.connect( process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB connected');

  } catch (error) {
    console.log(error);
    throw new Error('Error trying to connect to DB');
  }

};

module.exports = {
  dbConnection
};