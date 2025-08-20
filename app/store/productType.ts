import { create } from 'zustand'

interface State {
  type:string;
  setType:(newType:string)=>void
  scrollToSection:string;
  setScrollToSection:(newScrollToSection:string)=>void
}

export const useStore = create<State>((set) => ({
  type: '',
  setType:(newType:string)=>set(()=>({type:newType})),
  scrollToSection:'',
  setScrollToSection:(newScrollToSection:string)=>set(()=>({scrollToSection:newScrollToSection}))
}))
