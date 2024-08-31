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
  tagSskcookListAPI: (tag, pageParam) => {
    return instance.get('/sskcook', {
      params: {
        tag: tag,
        page: pageParam,
      },
    });
  },
  sskcookDetailsAPI: (sskcookId) => {
    return instance.get(`/sskcook/${sskcookId}`);
  },
  sskcookDeleteAPI: (sskcookId) => {
    return instance.delete(`/sskcook/${sskcookId}`);
  },
};
