const express = require('express')
const router = express.Router()
const Board = require('../models/board')

router.get('/', (req, res) => {
   try {
      const boards = Board.findAll()
      res.status(200).json({ message: '데이터 수신 완료', boards })
   } catch (err) {
      console.error(err)
      next(err)
   }
})

module.exports = router
