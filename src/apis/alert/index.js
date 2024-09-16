import instance from '..';

export const alertAPI = {
  requestAlertAPI: (data) => {
    return instance.post(`/alert/event`, data);
  },
  sendAlertAPI: (data) => {
    return instance.post('/alert/send', data);
  },
};
