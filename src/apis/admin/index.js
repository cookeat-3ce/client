import instance from '..';

export const AdminAPI = {
  verifyAPI: (data) => {
    return instance.post('/admin/member/verify', data);
  },
};
