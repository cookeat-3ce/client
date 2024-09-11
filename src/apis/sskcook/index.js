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
  sskcookUploadAPI: (formData) => {
    return instance.post('/sskcook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  sskcookUpdateAPI: (formData) => {
    return instance.put('/sskcook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  LikeAPI: (sskcookId) => {
    return instance.post('/sskcook/likes', { sskcookId: sskcookId });
  },
  ReportAPI: (sskcookId) => {
    return instance.post('/sskcook/report', { sskcookId: sskcookId });
  },
  sskcookDeleteAPI: (id) => {
    return instance.delete(`/sskcook/${id}`);
  },
  getSskcookRecommendsAPI: () => {
    return instance.get(`/sskcook/fridge`);
  },
};
