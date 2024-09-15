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
import { fridgeAPI } from '../../apis/fridge';

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
      try {
        const response = await memberAPI.loginAPI(data);
        return response;
      } catch (error) {
        throw new Error('Error');
      }
    },
    onSuccess: async (response) => {
      const { username, nickname, profileImage } = response.data;
      const accessToken = response.headers['auth'];

      setCookie(accessToken);
      const token = accessToken.split(' ')[1];

      const parts = token.split('.');
      const payload = parts[1];
      const decodedPayload = atob(payload);
      const payloadJson = JSON.parse(
        decodeURIComponent(escape(decodedPayload)),
      );

      const authValue = payloadJson.auth;

      const updatedMemberData = {
        username,
        nickname,
        profileImage,
        authValue,
      };

      setMemberState(updatedMemberData);
      const res = await fridgeAPI.getIngredientsAPI();

      authValue === 'ROLE_ADMIN' ? navigate('/admin') : navigate('/');
    },
    onError: (error) => {
      setShowError(true);
      console.error(error);
    },
  });
  const debouncedLogin = useCallback(
    debounce((data) => {
      mutation.mutate(data);
    }, 100),
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
            width={'18vw'}
            height={'6vh'}
            fontSize={'.8vw'}
            text={'아이디 입력'}
            onChange={handleUsernameChange}
          />
        </InputUsernameContainer>
        <InputPasswordContainer>
          <CustomInput
            type={'password'}
            width={'18vw'}
            height={'6vh'}
            fontSize={'.8vw'}
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
            fontSize={'1vw'}
            width={'18vw'}
            height={'7vh'}
            borderRadius={'100px'}
            borderColor={COLORS.TAG}
            fontFamily={'Happiness-Sans-Bold'}
            onClick={(e) => {
              e.preventDefault();
              debouncedLogin(loginData);
            }}
          ></CustomButton>
        </ButtonContainer>
        <SignUpTextContainer>
          <CustomText
            fontSize={'.8vw'}
            color={COLORS.BLACK}
            fontFamily={'Happiness-Sans-Regular'}
            text={'아직 회원이 아니신가요?'}
          ></CustomText>
          <div>
            <CustomTextButton
              text={'회원가입하기'}
              color={COLORS.ORANGE}
              fontSize={'.8vw'}
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
