import React, { useEffect } from 'react';
import {
  SwitchContainer,
  StyledSwitch,
  DetailsContainer,
  VideoContainer,
  WriteContainer,
} from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { sskcookAPI } from '../../apis/sskcook';
import { memberState } from '../../store';
import { useRecoilState } from 'recoil';
const SskcookDetails = () => {
  const sskcookId = window.location.pathname.split('/').pop();
  const [member, setMember] = useRecoilState(memberState);
  const sskcookDetailsQuery = useQuery({
    queryKey: ['sskccokDetails'],
    queryFn: () => sskcookAPI.sskcookDetailsAPI(sskcookId),
    staleTime: Infinity,
  });

  const sskcookDetails = sskcookDetailsQuery.data?.data;

  const onChange = (checked) => {
    setMember((prevState) => ({ ...prevState, audio: checked }));
  };
  return (
    <>
      <SwitchContainer>
        <CustomText
          text={'멈춰!'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1vw'}
          color={COLORS.BLACK}
        />
        <StyledSwitch checked={member.audio} onChange={onChange} />
      </SwitchContainer>
      <DetailsContainer>
        <VideoContainer />
        <WriteContainer />
      </DetailsContainer>
    </>
  );
};

export default SskcookDetails;
