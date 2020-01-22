const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema ({
    name: {
        type: String,
        unique: true
    },
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: "workout"
        }
    ]
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;