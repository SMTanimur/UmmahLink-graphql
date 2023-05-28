

import { StateCreator } from 'zustand';


export interface ThemeSlice {
 theme:string
 setTheme: (theme:string)=>void
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set, get) => ({
  theme:'light',
  setTheme(theme:string) {
      set({theme:theme})
  },
});
