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
};
