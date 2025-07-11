const passport = require('passport')
const Member = require('../models/member')
const local = require('./localStrategy')

module.exports = () => {
   passport.serializeUser((member, done) => {
      done(null, member.id)
   })
   passport.deserializeUser((id, done) => {
      Member.findOne({
         where: { id },
         attributes: ['id', 'email', 'name', 'createAt', 'updateAt', 'deleteAt'],
      })
         .then((member) => done(null, member))
         .catch((err) => done(err))
   })
   local()
}
