import instance from '..';

export const AdminAPI = {
  verifyAPI: (data) => {
    return instance.post('/admin/member/verify', data);
  },
  deleteVerifyAPI: (username) => {
    return instance.delete(`/admin/member/verify/${username}`);
  },
  deleteSskcookAPI: (data) => {
    return instance.delete(`/admin/sskcook/${data}`);
  },
};
