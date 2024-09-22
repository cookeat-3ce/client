import instance from '..';

/**
 * 슥쿡 API
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.08.28
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.28    양재혁       최초 생성
 * 2024.09.01    김지수       슥쿡 삭제
 * 2024.09.09    김지수       추천 레시피 목록 조회
 * </pre>
 */
export const sskcookAPI = {
  recentSskcookListAPI: (page) => {
    return instance.get('/sskcook', {
      params: {
        sort: 'latest',
        page: page,
      },
    });
  },
  monthlyLikesSskcookListAPI: (date) => {
    return instance.get('/sskcook/top', {
      params: {
        date: date,
      },
    });
  },

  sskcookDetailsAPI: (sskcookId) => {
    return instance.get(`/sskcook/${sskcookId}`);
  },
  sskcookUploadAPI: (formData) => {
    return instance.post('/sskcook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  sskcookUpdateAPI: (formData) => {
    return instance.put('/sskcook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  LikeAPI: (sskcookId) => {
    return instance.post('/sskcook/likes', { sskcookId: sskcookId });
  },
  ReportAPI: (sskcookId) => {
    return instance.post('/sskcook/report', { sskcookId: sskcookId });
  },
  sskcookDeleteAPI: (id) => {
    return instance.delete(`/sskcook/${id}`);
  },
  getSskcookRecommendsAPI: () => {
    return instance.get(`/sskcook/fridge`);
  },
};
