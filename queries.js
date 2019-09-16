/* Add all the required libraries*/

/* Connect to your database using mongoose - remember to keep your key secret*/
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	mySchema = new Schema({

		code: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		coordinates: {
			latitude: Number,
			longitude: Number
		},
		address: String

	}),
    Listing = require('./ListingSchema.js'),
    config = require('./config');

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
var listingObject = mongoose.model('listingObject', mySchema);
/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
	listingObject.findOne({ name: 'Library West' },function(err,obj){console.log(obj);});
	
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
	listingObject.findOneAndDelete({ code: 'CABL' }, function (err, obj) { console.log(obj); });
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */
	const filter = {name:'Phelps Laboratory'};
	const update = { address: '1953 Museum Rd, Gainesville, FL 32603' };
	listingObject.findOneAndUpdate(filter, update, {new:true}, function (err, obj) {
		
		console.log(obj);
	});
	
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
	const util = require('util')
	listingObject.find(function(err,obj){
		console.log(util.inspect(obj,{maxArrayLength:null}));
	})
};
findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
