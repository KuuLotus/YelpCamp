const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose, {
  errorMessages: {
    UserExistsError: "そのユーザー名は既に使われています",
    MissingPasswordError: "パスワードを入力してください",
    AttemptTooSoonError:
      "ログインの失敗が続いたため、アカウントをロックしました",
    TooManyAttemptsError:
      "ログインの失敗が続いたため、アカウントをロックしました",
    NoSaltValueStoredError: "認証ができませんでした",
    IncorrectPasswordError: "パスワードまたはユーザー名が間違っています",
    IncorrectUsernameError: "パスワードまたはユーザー名が間違っています",
  },
});

module.exports = mongoose.model("User", userSchema);
