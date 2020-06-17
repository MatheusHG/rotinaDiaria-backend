const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://codex:admin123@cluster0-7n0qk.mongodb.net/Cluster0?retryWrites=true&w=majority", { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise; 

module.exports = mongoose;
