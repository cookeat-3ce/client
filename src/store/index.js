import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

/**
 * 리코일 아톰
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.08.28
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.28    양재혁       최초 생성
 * </pre>
 */

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
