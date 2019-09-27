var crypto = require('crypto');
var dbservice = require('./Dbservice');

function SaltHasher(pass) {

    //var randSalt = cryptoRandom({ length: 20 });
    //var randSalt = securerandom.randomArray(10);
    var randSalt = crypto.randomBytes(64).toString('hex');


    var cipher = crypto.createHmac('md5', randSalt);
    var hashed = cipher.update(pass).digest('hex');

    console.log('______ sending hashes --- ', hashed, randSalt);
    //return salted hashed pswrds 
    return {
        salt: randSalt,
        passwordHash: hashed.trim()
    };

}

function UnHasher(username, password) {

    console.log('\n------ into **UNHASHER with : ', username, password);

    return new Promise((resolve, reject) => {
        var result = false;

        dbservice.GetPasswordFromUsername(username).then((User) => {

            TheFreshSalt = User[0].salt;
            console.log('\n**THE VALUE GIVEN TO  User , SALT (type) , Salt : \n', User, typeof(TheFreshSalt), User[0].salt);

            var cipher = crypto.createHmac('md5', TheFreshSalt);
            var hashed = cipher.update(password).digest('hex');
            console.log(' THE HASHED NEW PASS IS : ', hashed);

            if (User[0].password === hashed.trim()) {
                console.log('IN true part');
                result = true;
                resolve(result);
            } else {
                console.log('IN FALSE part');
                result = false;
                reject(result);
            }

        });
    });



}


exports.SaltHasher = SaltHasher;
exports.UnHasher = UnHasher;