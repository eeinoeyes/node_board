const express = require('express')
const router = express.Router()
const Board = require('../models/board')
const Member = require('../models/member')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { isLoggedIn } = require('./middleware')

try {
   fs.readdirSync('uploads') // 폴더 찾고
} catch (err) {
   console.log('💾폴더 없음')
   fs.mkdirSync('uploads') // 없으면 만들어
   console.log('✔uploads 폴더 생성 완료')
}
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const decodeFileName = decodeURIComponent(file.originalname) // 디코딩해서
         const ext = path.extname(decodeFileName) // ext에 넣고 확장자 추출
         const basename = path.basename(decodeFileName, ext) // 원본 파일이름 분리하고

         cb(null, basename + Date.now() + ext) // Date.now()붙여서 고유명 만들기
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

//특정 게시물 불러오기
router.get('/:id', async (req, res, next) => {
   try {
      console.log('📦요청받은 ID:', req.params.id)
      const targetPost = await Board.findOne({
         where: { id: req.params.id },
         include: {
            model: Member,
            attributes: ['id', 'name'],
         },
      })

      if (!targetPost) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }
      res.status(200).json({
         success: true,
         message: '게시물을 성공적으로 불러왔습니다.',
         data: targetPost,
      })
   } catch (error) {
      error.status = 500
      error.message = '특정 게시물을 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

//게시물 작성하기
router.post('/', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      console.log('💥req:', req)
      if (!req.body.title || !req.body.content) {
         const error = new Error('제목과 본문은 필수입력값입니다.')
         error.status = 400
         return next(error)
      }
      const post = await Board.create({
         title: req.body.title,
         content: req.body.content,
         img: req.file ? `/${req.file.filename}` : null,
         member_id: req.user.id,
      })

      res.status(200).json({
         success: true,
         message: '게시물이 성공적으로 등록되었습니다.',
         post: {
            id: post.id,
            title: post.title,
            content: post.content,
            img: post.img,
            author: post.member_id,
         },
      })
   } catch (err) {
      console.error(err)
      next(err)
   }
})

//게시물 수정하기
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      const data = await Board.findOne({
         where: {
            id: req.params.id,
            member_id: req.user.id,
         },
      })
      if (!data) {
         const error = new Error('게시물이 없습니다.')
         error.status = 404
         return next(error)
      }
      await data.update({
         title: req.body.title,
         content: req.body.content,
         img: req.file ? `/${req.file.filename}` : data.img,
      })

      const updateData = await Board.findOne({
         where: { id: req.params.id },
         include: {
            model: Member,
            attributes: ['id', 'name'],
         },
      })

      res.status(200).json({
         success: true,
         message: '게시물 수정 완료',
         data,
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 수정 중 오류가 발생했습니다.'
      next(error)
   }
})

//게시물 삭제
router.delete('/:id', isLoggedIn, async (req, res, next) => {
   try {
      const target = await Board.findOne({
         where: { id: req.params.id, member_id: req.user.id },
      })
      if (!target) {
         const error = new Error('게시물이 존재하지 않습니다.')
         error.status = 404
         return next(error)
      }
      await target.destroy()

      res.status(200).json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 삭제 중 오류가 발생했습니다.'
      next(error)
   }
})

//전체 게시물 불러오기
router.get('/', async (req, res, next) => {
   try {
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 5
      const offset = (page - 1) * limit
      const count = await Board.count() //전체 게시물 갯수
      const posts = await Board.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         include: {
            model: Member,
            attributes: ['id', 'email', 'name'],
         },
      })
      console.log('백엔드 board.js / router.get - posts:', posts)

      res.status(200).json({
         success: true,
         message: '게시물을 성공적으로 불러왔습니다.',
         posts,
         pagination: {
            totalPosts: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물을 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

module.exports = router
