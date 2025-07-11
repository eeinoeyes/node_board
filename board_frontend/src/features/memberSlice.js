import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { checkAuthStatus, loginUser, registerUser } from '../api/snsApi'

//회원가입
export const registerMemberThunk = createAsyncThunk('member/resisterMember', async (memberData, { rejectWithValue }) => {
   try {
      const response = await registerMemberThunk(memberData)
      return response.data
   } catch (err) {
      return rejectWithValue(error.response?.data?.message)
   }
})

//로그인
export const loginMemberThunk = createAsyncThunk('member/loginMember', async (_, { rejectWithValue }) => {
   try {
   } catch (err) {
      return rejectWithValue(error.response?.data?.message)
   }
})

//로그아웃
export const logoutMemberThunk = createAsyncThunk('member/logoutMember', async (_, { rejectWithValue }) => {
   try {
   } catch (err) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const memberSlice = createSlice({
   name: 'board',
   initialState: {},
   reducer: {},
})
export default memberSlice.reducer
