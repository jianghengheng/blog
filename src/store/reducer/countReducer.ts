import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GetCategroyList } from '~/src/api/category'

export interface CounterState {
  value: number,
  infoList: any,
  category: any
}

const initialState: CounterState = {
  value: 0,
  category: [],
  infoList: [],

}
export const fetchHomeMultidataAction = createAsyncThunk("fetch/homemultidata", async () => {
  const res = await GetCategroyList()
  return res.data
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: {
    [fetchHomeMultidataAction.fulfilled](state: CounterState, { payload }) {
      // 在fulfilled状态下, 将state中的banners和recommends修改为网络请求后的数据

      payload.sort(
        (a: any, b: any) => {
          a = a.num; b = b.num;
          if (a < b) { return 1 }
          else if (a > b) { return -1 }
          else { return 0 }
        }
      )
      state.infoList = payload.slice(0, 2)
      state.category = payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer