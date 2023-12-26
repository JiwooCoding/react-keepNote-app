import { configureStore } from "@reduxjs/toolkit";
import menuSlice from './menu/menuSlice';
import modalSlice from './modal/modalSlice';
import noteListSlice from './noteList/noteListSlice';
import tagsSlice from './tags/tagsSlice';

export const store =  configureStore({
    reducer:{
        menuSlice,
        modalSlice,
        noteListSlice,
        tagsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;