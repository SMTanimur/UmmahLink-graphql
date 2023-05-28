import { create } from "zustand";
import { ThemeSlice, createThemeSlice } from "./slices";
import { devtools, persist } from 'zustand/middleware';

type StoreState = ThemeSlice

export const useAppStore = create<StoreState>()(
    persist(
        (...a) => ({
            ...createThemeSlice(...a)
       
        }),
        { name: 'appStore' },
    ),
);