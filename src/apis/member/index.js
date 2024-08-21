import instance from '..';

export const memberAPI = {
  loginAPI: (loginData) => {
    return instance.post('/member/login', loginData);
  },
};
