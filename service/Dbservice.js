var User = require('../models/User');

function AddUser(objectUser) {

    let NewUser = new User({
        username: objectUser.username,
        password: objectUser.password,
        salt: objectUser.salt
    });

    return new Promise((resolve, reject) => {

        User.create(NewUser, (err, doc) => {
            if (err) {

                reject(err);
            } else {

                resolve(doc);
            }
        });

    });
}

function FindUser() {
    return new Promise((resolve, reject) => {
        User.find({}, (err, res) => {
            if (err) {
                console.log('error while displayig all records');
                reject(err);
            } else {
                console.log('ALL users are :', res);
                resolve(res);
            }
        });
    });


}


function GetPasswordFromUsername(user) {

    // check if exists and return PAssowrd for hashin if so . ; else ERROR
    return new Promise((resolve, reject) => {
        User.find({ username: user }, (err, res) => {
            if (err) {
                console.log('error while displayig  records');
                reject(err);
            } else {
                console.log(' user is :', res);
                resolve(res);
            }
        });
    });

}


exports.AddUser = AddUser;
exports.FindUser = FindUser;
exports.GetPasswordFromUsername = GetPasswordFromUsername;