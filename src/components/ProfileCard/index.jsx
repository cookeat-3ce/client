import { Container, TitleContainer, TitleText, NicknameText } from './styles';
import ProfileImage from '../ProfileImage'; // 프로필 이미지를 위한 컴포넌트

/**
 * 사용자 프로필 이미지, 제목, 닉네임
 *
 * @author 박유진
 * @version 1.0
 * @since 2024.09.05
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.05    박유진       최초 생성
 * </pre>
 */
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
