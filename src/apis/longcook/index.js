import instance from '..';

export const longcookAPI = {
  longcookDetailsAPI: (longcookId) => {
    return instance.get(`/longcook/${longcookId}`);
  },
  recentLongcookListAPI: (page) => {
    return instance.get('/longcook', {
      params: {
        sort: 'latest',
        page: page,
      },
    });
  },
  longcookUploadAPI: (formData) => {
    return instance.post('/longcook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  longcookUpdateAPI: (formData) => {
    return instance.put('/longcook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  longcookDeleteAPI: (id) => {
    return instance.delete(`/longcook/${id}`);
  }
};
