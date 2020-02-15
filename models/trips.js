const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        validate: [
            function(input) {
              return input.length >= 1;
            },
            "Title should be longer."
          ]
    },
    start: {
        type: Date,
        required: true
    },
    end: Date, 
    description: String,
    created: {
      type: Date,
      default: Date.now
    },
    lastUpdate: Date,
    users: {
      type: Schema.Types.ObjectId,
      ref: "users"
  }
});

// Custom method `lastUpdatedDate`
TripSchema.methods.lastUpdatedDate = function() {
  // Set the current user's `lastUpdated` property to the current date/time
  this.lastUpdated = Date.now();
  // Return this new date
  return this.lastUpdated;
};
const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
