const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  city: String,
  country: String,
  gender: { type: String,
    enum: [ 'female' , 'male', 'non-binary', 'prefer not to say' ],
    default: 'prefer not to say'
  },
  status: {
    type: String,
    enum: ["Pending confirmation", "Active"],
    default: "Pending confirmation"
  },
  confirmationCode: {
    type: String,
    unique: true
  },
  image: String,
  friends: { type: Array },
  GoogleID: { type: String }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
