import instance from '..';

/**
 * 멤버 API
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
 * 2024.08.31    김지수       사용자 정보 조회
 * 2024.09.08    김지수       사용자 인증 상태 조회 및 변경
 * 2024.09.15    김지수       사용자 한줄 소개 등록
 * </pre>
 */
export const memberAPI = {
  loginAPI: (loginData) => {
    return instance.post('/member/login', loginData);
  },
  logoutAPI: () => {
    return instance.post('/member/logout');
  },
  signUpAPI: (signUpData) => {
    return instance.post('/member/sign-up', signUpData);
  },
  storeAPI: (sskcookId) => {
    return instance.post(`/member/sskcook/${sskcookId}`, {
      sskcookId: sskcookId,
    });
  },
  subscriptionAPI: ({ followingUsername, followerUsername }) => {
    return instance.post('/member/subscription', {
      followingUsername,
      followerUsername,
    });
  },
  myInfoAPI: (username) => {
    return instance.get(`/member/${username}`);
  },
  verifyCheckAPI: (username) => {
    return instance.get(`/member/verify/${username}`);
  },
  verifyRequestAPI: (username) => {
    return instance.patch(`/member/${username}/verify`);
  },
  modifyOneLinerAPI: (data) => {
    return instance.post(`/member/one-liner`, data);
  },
};
