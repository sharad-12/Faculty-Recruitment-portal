require('dotenv').config();

module.exports={
    user:process.env.user,
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    refreshToken:process.env.refreshToken,
    accessToken:process.env.accessToken
}
