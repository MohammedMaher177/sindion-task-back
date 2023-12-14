import { Schema, Types, model } from "mongoose";
import bcryptjs from "bcryptjs";
const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minLength: 5,
      maxLength: 30,
    },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

// UserSchema.pre([/^find/, /^update/], function () {
//   this.populate("wishList", "name");
// });

UserSchema.pre(["save", /update/gim, /^create/], async function () {
  console.log(this._update);
  const defaultRound = parseInt(process.env.SALT_ROUNDS);
  if (this.password && bcryptjs.getRounds(this.password) != defaultRound) {
    this.password = bcryptjs.hashSync(
      this.password,
      parseInt(process.env.SALT_ROUNDS)
    );
  } else if (
    this._update.password &&
    bcryptjs.getRounds(this._update.password) != defaultRound
  ) {
    this._update.password = bcryptjs.hashSync(
      this._update.password,
      parseInt(process.env.SALT_ROUNDS)
    );
  }
});

const UserModel = model("User", UserSchema);

export default UserModel;
