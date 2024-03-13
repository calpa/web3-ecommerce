import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    value: string;
}

const initialState: CounterState = {
    value: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { change } = searchSlice.actions

export default searchSlice.reducer