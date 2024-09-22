import instance from '..';

/**
 * 어드민 API
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.09.11
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.11    양재혁       최초 생성
 * 2024.09.16    김지수       지난달 상위 10개 레시피 조회 API
 * </pre>
 */
export const AdminAPI = {
  verifyAPI: (data) => {
    return instance.post('/admin/member/verify', data);
  },
  deleteVerifyAPI: (username) => {
    return instance.delete(`/admin/member/verify/${username}`);
  },
  deleteSskcookAPI: (data) => {
    return instance.delete(`/admin/sskcook/${data}`);
  },
  postEvent: (data) => {
    return instance.post('/admin/event', data);
  },
  selectTop10SskcookAPI: (date) => {
    return instance.get(`/admin/sskcook/top?date=${date}`);
  },
};
