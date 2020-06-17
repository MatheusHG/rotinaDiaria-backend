const mongoose = require('mongoose');

mongoose.connect("mongodb://la:nego22@ds263448.mlab.com:63448/omnistack", { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise; 

module.exports = mongoose;
