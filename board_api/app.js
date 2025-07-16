const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const passport = require('passport')

const indexRouter = require('./routes')
const memberRouter = require('./routes/member')
const boardRouter = require('./routes/board')

const { sequelize } = require('./models') //db 내보내고 주석풀기
const passportConfig = require('./passport')

const app = express()
passportConfig()
app.set('port', process.env.PORT || 8002)

sequelize
   .sync({ force: false })
   .then(() => {})
   .catch((err) => {})

//미들웨어
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))

//세션
app.use(
   cors({
      origin: 'http://localhost:5173', // 또는 origin: true (모든 도메인 허용 시)
      credentials: true, // 쿠키 주고받기 허용 시 필요
   })
)
app.use(
   session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.COOKIE_SECRET,
      cookie: {
         httpOnly: true,
         secure: false,
      },
   })
)
//passport 초기화, 세션 연동
app.use(passport.initialize()) // 초기화
app.use(passport.session()) // passport와 생성해둔 세션 연결

//라우터
app.use('/', indexRouter)
app.use('/member', memberRouter)
app.use('/board', boardRouter)

//경로에러 처리
app.use((req, res, next) => {
   const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   err.status = 404
   next(err)
})

//그외 에러 처리
app.use((err, req, res, next) => {
   console.error(err)
   const statusCode = err.status || 500
   const errMessage = err.message || '서버 내부 오류'

   res.status(statusCode).json({
      success: false,
      message: errMessage,
      error: err,
   })
})

app.listen(app.get('port'), () => {
   console.log(`${app.get('port')}번 포트에서 대기 중`)
})
