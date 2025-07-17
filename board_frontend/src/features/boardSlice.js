import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, getPostById, getPosts } from '../api/boardApi'

//게시글 등록
export const createPostThunk = createAsyncThunk('board/createPost', async (data, { rejectWithValue }) => {
   try {
      const response = await createPost(data)
      console.log(response.data.post)
      return response.data.post
   } catch (err) {
      return rejectWithValue(err.response?.data?.message)
   }
})

//전체 게시물 가져오기
export const getPostsThunk = createAsyncThunk('board/getPosts', async (page, { rejectWithValue }) => {
   try {
      const response = await getPosts(page)
      console.log('💖boardSlice / getPostsThunk - response: ', response)
      return response.data
   } catch (error) {
      return rejectWithValue(err.response?.data?.message)
   }
})

//특정 게시물 가져오기
export const getPostByIdThunk = createAsyncThunk('board/getPostById', async (id, { rejectWithValue }) => {
   try {
      const response = await getPostById(id)
      console.log('💫boardSlice / getPostByIdThunk - respones: ', response.data)
      return response.data
   } catch (error) {
      return rejectWithValue(err.response?.data?.message)
   }
})
const boardSlice = createSlice({
   name: 'board',
   initialState: {
      data: null,
      posts: [],
      pagination: {},
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         //게시물 등록
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         //전체 게시물 가져오기
         .addCase(getPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.pagination = action.payload.pagination
         })
         .addCase(getPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         //특정 게시물만 가져오기
         .addCase(getPostByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getPostByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload.data
         })
         .addCase(getPostByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
