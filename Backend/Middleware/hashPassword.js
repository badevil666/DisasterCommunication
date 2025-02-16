const bcrypt = require("bcrypt")
async function passwordHasher(password) 
{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

module.exports = passwordHasher;