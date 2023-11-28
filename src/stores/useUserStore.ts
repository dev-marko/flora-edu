import { UserInfo } from '@/interfaces/auth/user-info';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: UserInfo;
  setUser: (user: UserInfo) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        avatarUrl: '',
      },
      setUser: (u) => set(() => ({ user: u })),
    }),
    {
      name: 'flora-edu-user-info',
    }
  )
);

export default useUserStore;
