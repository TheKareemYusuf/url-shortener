const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    //   required: [true, "First name is required"],
    },
    lastName: {
      type: String,
    //   required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      // select: false,
      required: function () {
        return this.isNew || this.isModified("password");
      },
    },
    confirmPassword: {
      type: String,
      // select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
      required: function () {
        return this.isNew || this.isModified("password");
      },
    },
  },
  { timestamps: true }
);


// Pre hook to hash password before saving to database
UserSchema.pre("save", async function (next) {
  // const user = this;

  if (!this.isModified('password')) return next();

  const hash = await bcrypt.hash(this.password, 12);

  this.password = hash;

  this.confirmPassword = undefined;
  next();
});

// Method to check if the password is valid
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
