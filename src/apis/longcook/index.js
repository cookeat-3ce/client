import instance from '..';

/**
 * 롱쿡 API
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
 * 2024.09.02    박유진       롱쿡 수정, 업로드
 * 2024.09.03    박유진       롱쿡 상세 조회, 삭제
 * </pre>
 */
export const longcookAPI = {
  longcookDetailsAPI: (longcookId) => {
    return instance.get(`/longcook/${longcookId}`);
  },
  recentLongcookListAPI: (page) => {
    return instance.get('/longcook', {
      params: {
        sort: 'latest',
        page: page,
      },
    });
  },
  longcookUploadAPI: (formData) => {
    return instance.post('/longcook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  longcookUpdateAPI: (formData) => {
    return instance.put('/longcook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  longcookDeleteAPI: (id) => {
    return instance.delete(`/longcook/${id}`);
  },
};
