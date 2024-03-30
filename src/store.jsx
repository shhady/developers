import { configureStore } from "@reduxjs/toolkit";
import { projectsApi } from "./services/projectsApi";
import { usersApi } from "./services/usersApi";
import projectReducer from './storeSlices/ProjectSlice'
import {liveCodingApi} from "./services/liveCodingAPI";
export const store = configureStore({
    reducer:{
        [projectsApi.reducerPath]: projectsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [liveCodingApi.reducerPath]: liveCodingApi.reducer,
        project: projectReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(projectsApi.middleware, usersApi.middleware, liveCodingApi.middleware)
})

