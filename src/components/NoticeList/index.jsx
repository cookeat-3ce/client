import React from 'react';
import { Container } from './styles';
import Notice from '../Notice';

/**
 * 공지 목록 컴포넌트
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.08.31
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.31    김지수       최초 생성
 * </pre>
 */
const CustomNoticeList = ({ notices }) => {
  return (
    <Container>
      {notices &&
        notices.map((notice, index) => (
          <Notice
            key={index}
            title={notice.title}
            content={notice.content}
            noticeId={notice.noticeId}
          />
        ))}
    </Container>
  );
};

export default CustomNoticeList;
