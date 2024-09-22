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
