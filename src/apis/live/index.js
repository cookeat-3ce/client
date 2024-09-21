import instance from '..';

export const liveAPI = {
  addLiveAPI: (formData) => {
    return instance.post('/live', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getLiveInfoAPI: (liveId) => {
    return instance.get(`/live/${liveId}`);
  },
  endLiveAPI: (liveId) => {
    return instance.delete(`/live/${liveId}`);
  },
};
