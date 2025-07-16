import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutMemberThunk } from '../../features/memberSlice'

export default function ButtonAppBar({ isAuthenticated, member }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const handleLogout = () => {
      dispatch(logoutMemberThunk())
         .unwrap()
         .then(() => navigate('/'))
         .catch((error) => console.error('에러 발생:', error))
   }
   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" style={{ width: '100%', backgroundColor: 'pink', boxShadow: 'none', textAlign: 'center' }}>
            <Toolbar>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  melting heart
               </Typography>
               {isAuthenticated ? (
                  <>
                     <Link to="/post/create">
                        <Button color="inherit">글쓰기</Button>
                     </Link>

                     <Button color="inherit" onClick={handleLogout}>
                        로그아웃
                     </Button>
                  </>
               ) : (
                  <Link to={'/login'}>
                     <Button color="inherit">로그인</Button>
                  </Link>
               )}
            </Toolbar>
         </AppBar>
      </Box>
   )
}
