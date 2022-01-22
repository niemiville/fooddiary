const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        minlength: 1, 
        maxlength: 50, 
        trim: true
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 10,
        maxlength: 1000,
        set: setPassword
    }
});

/**
 * Checks if password is long enough and generates hash
 * 
 * @param {string} password user's password
 * @returns {string} too short password or hashed password
 */
function setPassword(password){
    if(password.length < 10) { 
        return password; 
    }else{
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    };
}
/**
 * Compare supplied password with user's own (hashed) password
 *
 * @param {string} password user's password
 * @returns {Promise<boolean>} promise that resolves to the comparison result
 */
userSchema.methods.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Omit the version key when serialized to JSON
userSchema.set('toJSON', { virtuals: false, versionKey: false });

const User = new mongoose.model('User', userSchema);
module.exports = User;