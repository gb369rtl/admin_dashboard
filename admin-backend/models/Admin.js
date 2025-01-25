const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }, // Reference Role Schema
    mfaEnabled: { type: Boolean, default: false },
    mfaSecret: { type: String, default: null },
    mfaDeadline: { type: Date, default: () => Date.now() + 15 * 24 * 60 * 60 * 1000 },
    accountStatus: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  });

// Password hashing
// adminSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = mongoose.model('Admin', adminSchema);
