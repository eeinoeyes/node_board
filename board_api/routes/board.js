const express = require('express')
const router = express.Router()
const Board = require('../models/board')
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
   Storage: multer.diskStorage({
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

// router.get('/', (req, res) => {
//    try {
//       const boards = Board.findAll()
//       res.status(200).json({ message: '데이터 수신 완료', boards })
//    } catch (err) {
//       console.error(err)
//       next(err)
//    }
// })

router.post('/', upload.single('img'), async (req, res, next) => {
   try {
      console.log('req:', req)
   } catch (err) {
      console.error(err)
      next(err)
   }
})

module.exports = router
