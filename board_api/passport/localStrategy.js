const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Member = require('../models/member')

module.exports = () => {
   passport.use(
      new LocalStrategy(
         {
            usernameField: 'email',
            passwordField: 'password',
         },

         //로그인 인증 로직
         async (email, password, done) => {
            try {
               const exMember = await Member.findOne({ where: { email } })

               if (exMember) {
                  const result = await bcrypt.compare(password, exMember.password)
                  if (result) {
                     done(null, exMember)
                  } else {
                     done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                  }
               } else {
                  done(null, false, { message: '가입되지 않은 이메일입니다.' })
               }
            } catch (err) {
               console.log('passport 에러:', err)
               done(err)
            }
         }
      )
   )
}
