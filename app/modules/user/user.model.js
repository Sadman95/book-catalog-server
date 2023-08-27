const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")
const ApiError = require("../../../errors/ApiError")

const userSchema = new Schema({
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["user"],
            default: "user"
        }

    },
    {
        timestamps: true,
    })

userSchema.pre("save", async function(next){
    const user = this;
    const isExist = await User.findOne({email: user.email});
    if(isExist){
        throw new ApiError(409, "User already exists");
    }
    else{
        user.password = await bcrypt.hash(user.password, 12);
    }
    next();
})

userSchema.methods.isPasswordMatch = async function(givenPassword, savedPassword){
        return await bcrypt.compare(givenPassword, savedPassword);

}
userSchema.methods.isUserExists = async function(email){
        const user = await User.findOne(
            {email: email},
        ).lean();
        return user;

};


const User= model("User", userSchema)
module.exports = User