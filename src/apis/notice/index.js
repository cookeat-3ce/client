import instance from '..';

export const noticeAPI = {
  noticeDeleteAPI: (noticeId) => {
    return instance.delete(`/notice/${noticeId}`);
  },
};
