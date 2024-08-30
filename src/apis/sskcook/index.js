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
  tagSskcookListAPI: (tag, page) => {
    return instance.get('/sskcook', {
      params: {
        tag: tag,
        page: page,
      },
    });
  },
  sskcookDetailsAPI: (data) => {
    return instance.get(`/sskcook/${data}`);
  },
  sskcookUploadAPI: (formData) => {
    return instance.post('/sskcook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};
