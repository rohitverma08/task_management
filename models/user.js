const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error("Password should be more than 6 characters!");
            } else if (value.toLowerCase() == "password") {
                throw new Error("Password cannot be password, come on man!");
            }
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    },],
    avatar: {
        type: Buffer,
    },
}, {
    timestamps: true,
});