const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      //unique: true,
      //trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {
      type: String,
      default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCANSA1IDASIAAhEBAxEB/8QAGwABAQEBAQEBAQAAAAAAAAAAAAECAwQFBgf/xAA4EAEAAgECBQIFAwIFBAMBAQAAAQIRAyEEEjFBUWFxBRMigZEyobFCwRQjUtHwBmLh8RUkgnKi/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAlEQEBAAICAwADAAIDAQAAAAAAAQIRITEDEkETIlFhcQQyQiP/2gAMAwEAAhEDEQA/APxyiAKAAAAigAAAAAAAAigAAAAAAACgAAAqiAAAIAgCogCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKIAqsqCiArQgIoCgvZAFVBBQFAAABFABQAAAFQAFQAAyAAAAAADmAMgAAAAAAAAAAAAAAAAAAACgAAAAAIAqAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKgAqAKIoCoCtGUBFVlQURQUQBRFFAAABQAAAAAAAAAAAAAHMAZAAAQFAAEAUABFAAARQAAAUABAFEABDIKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKgAACggNCANCAKqAKqAqgAACiAAqAKIAoICiAAAAAjAAgAAigoAIAAAgKAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAHcAAAAAAAAABQEAAAAAAAAAAAAAAAAAAAAAAAAAAABRAFVAFVlQVWVFVWVBRAAAVUAQVAUAAAAAAwGfQBgAZAAAAAAEUAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAUEFQAVABUAUQBUUAAEFAQAAAAAFQAAAAAAAAAAAAAAAAAAAURQUQBoRQUQFUAAAUAAAAAAQANgAZAGQAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAFAQUBBUABQQUBBQEUAAAAQFRQEUAEUBBQEUAQUBFEAUQBUAUAEUAEAFQAAAAAAAFQAUAFQBoQFaEAUAAAAEBRAFQBQARkAQAAAgAAAAAAAAAQBUAAAAAAAAAAAAFAEAIFARRAAUAAAAAAAEBQAAAAAAAAAAAAAAAAAEUARQBFAEUAEAVFAQUBBQEFQAVAAAAAAAFRQAAVWVBVQBRAUAAAAAADIDIAgAAAAAAAAAAigIAAAAAAAAAAAAACoAKioAqKAAAgoAAAAAAAAAAAAAAAAAAAACKAAAigACAoigAAigAigAAAAIKAIKCCgIKkACoAAAAAqAKACqyoKICqAAAAAoCCCACAAAAAAAICooCKgAAAAAqKCCgICgCKCCgCKAIAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAigAAIoAAAAAAAAAAAAAAAIqAAAAAAAKgCgAoigAAKgKAAAAgAgAAAACSCggKCAAAAoIKAiiAAACgAAAigAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIoCCoAAAAAAAACiKB3VAFAFBFAE2AABAAAAAEBQAEUAAAEAUAAAAABFAAAAAAAAAAAAAAAAAAAAAAUEFAEUBBQEUAE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"
    },
    bio :{
      type: String,
      max: 1024,
      default:"biographie vide... "
    },
    likes :[{
    type : Schema.Types.ObjectId,
    ref : 'Article'
  }],
  
  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;