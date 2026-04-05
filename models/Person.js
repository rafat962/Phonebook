import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Name must be at least 3 characters long"],
        required: [true, "Name is required"],
    },

    number: {
        type: String,
        required: [true, "Number is required"],
        minlength: [8, "Number must be at least 8 characters long"],
        validate: {
            validator: (v) => /^\d{2,3}-\d+$/.test(v),
            message: (props) =>
                `${props.value} is not a valid phone number! Format must be XX-XXXXXXXX or XXX-XXXXXXXX`,
        },
    },
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default mongoose.model("Person", personSchema);
