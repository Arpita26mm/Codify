//DESTRUCTURED WAY OF DIRECTLY CREATING AND USING SCHEMA   //NEW WAY--->compare with user-model.js
const { Schema, model } = require("mongoose");
const contactschema = new Schema({
  //no need to write mongoose.schema...bcoz we have already " get "schema in line2
  username: { type: String, required: true }, //mistake: Schema and model are inbuilt property....but I wrote 'schema' instead of 'Schema'
  email: { type: String, required: true },
  message: { type: String, required: true },
});

//create a model or collection
const Contact = new model("contact", contactschema); //not mongoose.model bcoz we have already " get " model
module.exports = Contact;
