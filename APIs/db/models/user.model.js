const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    age:{
        type: Number,
        default: 15,
        maxlength: 80,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ("Invalid Email Syntax")
        }
    },
    password: {
        type: String,
        trime: true,
        required: true,
        minlength: 5,
        validate(value) {
            if(value.includes(this.name)) throw  new Error ("Password Can't Contain Your Name")
        }
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error ("Incorrect Phone Number")

        }
    },
    gender: {
        type: String,
        required: true,
        enum: ["female", "male"]
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],

    image: {
        type: String,
        trim: true
    }

}, 

    {timestamps: true})


userSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.password,
    delete user.__v
    return user

}

userSchema.pre("save", async function() {
    const user = this
    if(user.isModified("password")) 
    user.password = await bcrypt.hash(user.password, 10)
})




const User = mongoose.model("User", userSchema)

module.exports = User