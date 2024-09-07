import instance from '..';

export const noticeAPI = {
  noticeInsertAPI: (addNoticeData) => {
    return instance.post(`/notice`, addNoticeData);
  },
  noticeDeleteAPI: (noticeId) => {
    return instance.delete(`/notice/${noticeId}`);
  },
};
