const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        index: {
            unique: true
        },
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        maxlength: [6, "Username must be no longer than 6 characters!"]
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [6, "Must be at least 6 characters long!"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    online: {
        type: Boolean,
        default: false
    },
    avatarStyle: {
        type: String
    },
    topType: {
        type: String
    },
    accessoriesType: {
        type: String
    },
    hairColor: {
        type: String
    },
    facialHairType: {
        type: String
    },
    facialHairColor: {
        type: String
    },
    clotheType: {
        type: String
    },
    clotheColor: {
        type: String
    },
    graphicType: {
        type: String
    },
    eyeType: {
        type: String
    },
    eyebrowType: {
        type: String
    },
    mouthType: {
        type: String
    },
    skinColor: {
        type: String
    }
});

userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.validPassword = function (password, cb) {
    console.log("Inside Model, password: ", password)
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", userSchema);


module.exports = User;