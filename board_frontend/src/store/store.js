import { configureStore, createStore } from '@reduxjs/toolkit'
import memberSlice from '../features/memberSlice'
import boardSlice from '../features/boardSlice'

const store = configureStore({
   reducer: {
      members: memberSlice,
      board: boardSlice,
   },
})

export default store
