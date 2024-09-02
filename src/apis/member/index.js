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
  myInfoAPI: (username) => {
    return instance.get(`/member/${username}`);
  },
  subscriptionAPI: ({ followingUsername, followerUsername }) => {
    return instance.post('/member/subscription', {
      followingUsername,
      followerUsername,
    });
  },
};
