import instance from '..';

export const sskcookAPI = {
  recentSskcookListAPI: (page) => {
    return instance.get('/sskcook', {
      params: {
        sort: 'latest',
        page: page,
      },
    });
  },
  monthlyLikesSskcookListAPI: (date) => {
    return instance.get('/sskcook', {
      params: {
        date: date,
      },
    });
  },

  sskcookDetailsAPI: (sskcookId) => {
    return instance.get(`/sskcook/${sskcookId}`);
  },
};
