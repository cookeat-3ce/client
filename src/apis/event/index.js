import instance from '..';

/**
 * 이벤트 API
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.09.09
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.09    김지수       최초 생성, 이벤트 조회
 * 2024.09.21    김지수       이벤트 조회 시 필터링 조건 추가
 * </pre>
 */
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
