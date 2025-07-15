import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost } from '../api/boardApi'

export const createPostThunk = createAsyncThunk('board/createPost', async (data, { rejectWithValue }) => {
   try {
      const response = await createPost(data)
      console.log(response.data.post)
      return response.data.post
   } catch (err) {
      return rejectWithValue(err.response?.data?.message)
   }
})

const boardSlice = createSlice({
   name: 'board',
   initialState: {
      data: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
