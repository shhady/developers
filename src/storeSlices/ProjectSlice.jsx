import { createSlice } from "@reduxjs/toolkit";

const initialState= {project: null}

//redux - toolkit
const projectSlice = createSlice({
    name: 'project',// or any name you want, but its is mandatory
    // initialState: {counter: 0, showConter: true},
    initialState,
    reducers:{
        setOriginalProject(state, action){
            state.project = action.payload
        },
    }
})

export const projectActions = projectSlice.actions
export default projectSlice.reducer;