import instance from '..';

/**
 * 실시간 클래스 API
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.09.01
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.01    김지수       최초 생성, 클래스 등록
 * 2024.09.05    김지수       클래스 조회, 종료
 * </pre>
 */
export const liveAPI = {
  addLiveAPI: (formData) => {
    return instance.post('/live', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getLiveInfoAPI: (liveId) => {
    return instance.get(`/live/${liveId}`);
  },
  endLiveAPI: (liveId) => {
    return instance.delete(`/live/${liveId}`);
  },
};
