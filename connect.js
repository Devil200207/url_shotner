const mongoose = require('mongoose');

async function ConnectMongoose(url)
{
    return mongoose.connect(url);
}

module.exports = {
    ConnectMongoose
};