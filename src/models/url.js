import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const urlSchema = new mongoose.Schema({
  originalURL: {type: String, required: true},
  shortURL: {type: String, unique: true},

});

urlSchema.pre('save', function(next) {
  bcrypt.hash(JSON.stringify(this._id), 5)
    .then(hashed => {
      this.shortURL = hashed.slice(hashed.length - 6, hashed.length);
      next();
    });
});

export default mongoose.model('urlShortener', urlSchema);