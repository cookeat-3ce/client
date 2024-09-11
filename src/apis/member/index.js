import instance from '..';

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
};
