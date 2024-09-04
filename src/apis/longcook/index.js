import instance from '..';

export const longcookAPI = {
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
  longcookDeleteAPI: (longcookId) => {
    return instance.delete(`/longcook/${longcookId}`);
  },
};
