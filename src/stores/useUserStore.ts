import { persist } from 'zustand/middleware';
import { UserInfo } from '@interfaces/auth/user-info';
import user from '@constants/empty-user-info';
import { createWithEqualityFn } from 'zustand/traditional';

interface UserState {
  user: UserInfo;
  setUser: (user: UserInfo) => void;
}

const useUserStore = createWithEqualityFn<UserState>()(
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
