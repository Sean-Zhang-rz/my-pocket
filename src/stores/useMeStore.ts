import { User } from "@/api/types/common";
import request, { Result } from "@/config/request";
import create from "zustand";

interface MeState {
  userInfo?: User;
  me?: Promise<Result<User>>;
  refreshMe: () => void;
  fetchMe: () => void;
};

const useMeStore = create<MeState>((set, get) => ({
  userInfo: {
    email:'',
    id:''
  },
  me: undefined,

  async refreshMe(){
    const me = request.get<User>('/me')
    this.me = me
    set({
      me
    })
  },
  async fetchMe(){
    this.refreshMe()
  },
}));
export default useMeStore;
