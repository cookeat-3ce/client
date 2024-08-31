import React from 'react';
import { Container } from './styles';
import Notice from '../Notice';

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
