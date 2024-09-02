import instance from '..';

export const liveAPI = {
  addLiveAPI: (addLiveData) => {
    return instance.post('/live', addLiveData);
  },
};
