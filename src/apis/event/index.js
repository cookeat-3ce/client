import instance from '..';

export const eventAPI = {
  eventListAPI: (page) => {
    return instance.get(`/event?page=${page}`);
  },
  eventDetailAPI: (id) => {
    return instance.get(`/event/${id}`);
  },
};
