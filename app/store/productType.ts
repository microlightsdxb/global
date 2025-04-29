import { create } from 'zustand'

interface State {
  type:string;
  setType:(newType:string)=>void
}

export const useStore = create<State>((set) => ({
  type: '',
  setType:(newType:string)=>set(()=>({type:newType}))
}))
