const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'sales', 'deliveryManager', 'inventoryManager'],
        default: 'sales'
    },
    branch: {
        type: String,
        enum: ['all', 'cairo', 'october', 'delta', 'alexandria'],
        required: [true, 'Please select a branch']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
        validate: {
            // this only works on save | create 
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not the same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JWTTimeStamp < changedTimeStamp
    }
    return false
}
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log({ resetToken });
    console.log(this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}


const User = mongoose.model('User', userSchema)

module.exports = User