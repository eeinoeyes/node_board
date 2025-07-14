const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const router = express.Router()
const Member = require('../models/member')
const { isNotLoggedIn, isLoggedIn } = require('./middleware')

//회원가입
//localhost:8000/member/enter
router.post('/enter', isNotLoggedIn, async (req, res, next) => {
   try {
      const { email, name, password } = req.body
      const exMember = await Member.findOne({ where: { email } })

      // 중복 이메일일시 에러 처리
      if (exMember) {
         return res.status(409).json({
            success: false,
            message: '이미 가입된 이메일입니다.',
         })
      }

      const hash = await bcrypt.hash(password, 12)
      const newMember = await Member.create({
         email,
         name,
         password: hash,
      })
      res.status(201).json({
         success: true,
         message: '회원가입이 완료되었습니다.',
         user: {
            id: newMember.id,
            email: newMember.email,
            name: newMember.name,
         },
      })
   } catch (err) {
      err.message = '회원가입 중 오류가 발생했습니다.'
      next(err)
   }
})

//로그인
router.post('/login', isNotLoggedIn, async (req, res, next) => {
   passport.authenticate('local', (error, member, info) => {
      if (error) {
         error.status = 500
         error.message = '인증 중 오류 발생'
         return next(error)
      }
      if (!member) {
         const error = new Error(info.message || '로그인 실패')
         error.status = 401
         return next(error)
      }

      req.login(member, (loginError) => {
         if (loginError) {
            loginError.status = 500
            loginError.message = '로그인 중 오류 발생'
            return next(loginError)
         }
      })

      res.status(200).json({
         success: true,
         message: '로그인 성공',
         member: {
            id: member.id,
            name: member.name,
         },
      })
   })(req, res, next)
})

//로그아웃
router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logOut((logoutError) => {
      if (logoutError) {
         logoutError.status = 500
         logoutError.message = '로그아웃 중 오류 발생'
         return next(logoutError)
      }

      res.status(200).json({
         success: true,
         message: '로그아웃 완료',
      })
   })
})
module.exports = router
