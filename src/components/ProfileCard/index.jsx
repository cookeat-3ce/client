import { Container, TitleContainer, TitleText, NicknameText } from './styles';
import ProfileImage from '../ProfileImage'; // 프로필 이미지를 위한 컴포넌트

const VideoCardWithProfile = ({ profileImage, index, profile = true }) => {
  return (
    <Container>
      {profile && (
        <ProfileImage
          src={profileImage}
          width="3vw"
          height="3vw"
          borderRadius="50%"
          onClick={() =>
            (window.location.href = `/subscription/${index.username}`)
          }
        />
      )}
      <TitleContainer>
        <TitleText>{index.title}</TitleText>
        {profile && <NicknameText>{index.nickname}</NicknameText>}
      </TitleContainer>
    </Container>
  );
};

export default VideoCardWithProfile;
