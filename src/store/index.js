import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const memberState = atom({
  key: 'memberState',

  default: {
    username: '',
    nickname: '',
    profileImage: '',
    role: '',
    audio: false,
  },

  effects_UNSTABLE: [persistAtom],
});

export const subscriptionState = atom({
  key: 'subscriptionState',
  default: {
    username: '',
    nickname: '',
    profileImage: '',
  },
});
