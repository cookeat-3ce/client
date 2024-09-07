import instance from '..';

export const liveAPI = {
  addLiveAPI: (addLiveData) => {
    return instance.post('/live', addLiveData);
  },
  getLiveInfoAPI: (liveId) => {
    return instance.get(`/live/${liveId}`);
  },
  endLiveAPI: (liveId) => {
    return instance.delete(`/live/${liveId}`);
  },
};
