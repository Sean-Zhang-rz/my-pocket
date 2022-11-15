import create from 'zustand';
interface Demo {
  count: number;
  add: () => void;
}
const useDemo = create<Demo>((set, get) => ({
  count: 0,
  add: () => set((state) => ({ count: state.count + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}));
