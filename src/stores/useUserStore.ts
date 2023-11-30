import { UserInfo } from '@/interfaces/auth/user-info';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import user from '@/constants/empty-user-info';

interface UserState {
  user: UserInfo;
  setUser: (user: UserInfo) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user,
      setUser: (u) => set(() => ({ user: u })),
      removeUser: () =>
        set(() => ({
          user: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            avatarUrl: '',
          },
        })),
    }),
    {
      name: 'flora-edu-user-info',
    }
  )
);

export default useUserStore;
