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
  sskcookDeleteAPI: (sskcookId) => {
    return instance.delete(`/sskcook/${sskcookId}`);
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
  sskcookDeleteAPI: (id) => {
    return instance.delete(`/sskcook/${id}`);
  }
};
