const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const router = express.Router()
const Member = require('../models/member')

//회원가입
//localhost:8000/member/enter
router.post('/enter', async (req, res, next) => {
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
router.post('/login', async (req, res, next) => {
   try {
   } catch (err) {
      err.message = '로그인에 실패했습니다.'
      next(err)
   }
})

//로그아웃
router.get('/logout', async (req, res, next) => {
   try {
   } catch (err) {
      err.message = '로그아웃 도중 오류가 발생했습니다.'
      next(err)
   }
})
module.exports = router
