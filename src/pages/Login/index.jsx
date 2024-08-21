import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  LoginWrapper,
  LoginTextContainer,
  ErrorLoginTextContainer,
  InputUsernameContainer,
  InputPasswordContainer,
  ButtonContainer,
  SignUpTextContainer,
} from './styles';
import { CustomInput } from '../../components/Input';
import CustomButton from '../../components/Button';
import CustomTextButton from '../../components/Button/Text';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { setCookie, useCustomNavigate } from '../../hooks';
import { memberAPI } from '../../apis/member';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { memberState } from '../../store';
import { getCookie } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const Login = () => {
  const navigate = useNavigate();
  const accessToken = getCookie('accessToken');
  useEffect(() => {
    if (accessToken) {
      navigate('/', { replace: true });
    }
  }, [accessToken, navigate]);
  const { handleChangeUrl } = useCustomNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const setMemberState = useSetRecoilState(memberState);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginData = {
    username: username,
    password: password,
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await memberAPI.loginAPI(data);
      return response;
    },
    onSuccess: (response) => {
      const { nickname, profileImage } = response.data;
      const accessToken = response.headers.get('auth');
      const updatedMemberData = {
        nickname,
        profileImage,
      };
      setMemberState(updatedMemberData);
      setCookie(accessToken);
      handleChangeUrl('/');
    },
    onError: (error) => {
      setShowError(true);
    },
  });

  const debouncedLogin = useCallback(
    debounce((data) => {
      mutation.mutate(data);
    }, 300),
    [],
  );

  return (
    <Container>
      <LoginWrapper>
        <LoginTextContainer>로그인</LoginTextContainer>
        {showError && (
          <ErrorLoginTextContainer>
            로그인 정보가 일치하지 않습니다.
          </ErrorLoginTextContainer>
        )}
        <InputUsernameContainer>
          <CustomInput
            type={'text'}
            width={'20vw'}
            height={'6vh'}
            fontSize={'1vw'}
            text={'아이디 입력'}
            onChange={handleUsernameChange}
          />
        </InputUsernameContainer>
        <InputPasswordContainer>
          <CustomInput
            type={'password'}
            width={'20vw'}
            height={'6vh'}
            fontSize={'1vw'}
            text={'비밀번호 입력'}
            onChange={handlePasswordChange}
          />
        </InputPasswordContainer>
        <ButtonContainer>
          <CustomButton
            type="submit"
            text={'로그인'}
            color={COLORS.WHITE}
            backgroundColor={COLORS.ORANGE}
            fontSize={'1.1vw'}
            width={'20vw'}
            height={'6vh'}
            borderColor={COLORS.ORANGE}
            onClick={(e) => {
              e.preventDefault();
              debouncedLogin(loginData);
            }}
          ></CustomButton>
        </ButtonContainer>
        <SignUpTextContainer>
          <CustomText
            fontSize={'1vw'}
            color={COLORS.NAVY}
            fontFamily={'Happiness-Sans-Regular'}
            text={'아직 회원이 아니신가요?'}
          ></CustomText>
          <div>
            <CustomTextButton
              text={'회원가입하기'}
              color={COLORS.ORANGE}
              fontSize={'1vw'}
              onClick={() => {
                handleChangeUrl('/signup');
              }}
              style={{ textDecoration: 'underline' }}
            />
          </div>
        </SignUpTextContainer>
      </LoginWrapper>
    </Container>
  );
};

export default Login;
