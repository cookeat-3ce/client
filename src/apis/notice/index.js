import instance from '..';

/**
 * 사용자 공지 API
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.08.31
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.31    김지수       최초 생성, 사용자 공지 조회
 * 2024.09.05    김지수       사용자 공지 등록
 * </pre>
 */
export const noticeAPI = {
  noticeInsertAPI: (addNoticeData) => {
    return instance.post(`/notice`, addNoticeData);
  },
  noticeDeleteAPI: (noticeId) => {
    return instance.delete(`/notice/${noticeId}`);
  },
};
