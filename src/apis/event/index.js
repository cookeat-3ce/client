import instance from '..';

export const eventAPI = {
  eventListAPI: (page, filtering) => {
    return instance.get(`/event`, {
      params: {
        page: page,
        filtering: filtering,
      },
    });
  },
  eventDetailAPI: (id) => {
    return instance.get(`/event/${id}`);
  },
};
