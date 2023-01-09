const {hash} = require("bcryptjs");

hashPassword = async password => {  
    return await new Promise((resolve, reject) => {
      //10 is the number of salt rounds
      hash(password, 10, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  }

module.exports = {
    hashPassword
}