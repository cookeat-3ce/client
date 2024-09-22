import instance from '..';

/**
 * 알림 API
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.09.11
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.11    김지수       최초 생성, 이벤트 알림 등록
 * 2024.09.16    김지수       사용자에 알림 발송
 * </pre>
 */
export const alertAPI = {
  requestAlertAPI: (data) => {
    return instance.post(`/alert/event`, data);
  },
  sendAlertAPI: (data) => {
    return instance.post('/alert/send', data);
  },
};
