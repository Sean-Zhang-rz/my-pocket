import create from 'zustand';
interface SignInData {
  email: string;
  code: string;
}
interface SignIn {
  data: SignInData;
}
const useSignInStore = create<SignIn>((set, get) => ({
  data: {
    email: '',
    code: '',
  },
  setData: (data: Partial<SignInData>) => {
    set((state) => ({
      data: {
        ...state.data,
        ...data,
      },
    }));
  },
}));
export default useSignInStore;
