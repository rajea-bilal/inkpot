import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters"],
      select: false, // mongoDB will not return the pw field, unless asked explicitly
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // This means MongoDB/Mongoose will automatically add: createdAt
  },
);

// before saving the user, hash the password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    // this is the document/user object beind saved
    // uses the string "password" because my schema has a field called password.
    // if password is not modified, mpve on
    return;
  }

  // if password is modified, then hash it
  this.password = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
});

// custom method to compare entered password with hashed password
userSchema.methods.comparePassword = function (userEnteredPassword) {
  return bcrypt.compare(userEnteredPassword, this.password); // returns a promise that revolves to true/false
};

const userModel = mongoose.model("users", userSchema);
export default userModel;
