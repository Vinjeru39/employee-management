import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    employeeID: {
      type: String,
    },
    grade: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); //this.password is the one currently stored in the database for the iser
};

//pre aloows us to do something before its saved in the db, save specifies before saving, in this case when registering
//You can also do userSche,a.post but this will do after its saved to the db.
//Here we are simply hashing our user password from here
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //if we are not dealing with the password, just move on
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
