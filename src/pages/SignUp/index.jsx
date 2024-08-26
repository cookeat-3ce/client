import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../hooks';
import {
  Container,
  SignUpWrapper,
  SignUpTextContainer,
  Inner,
  InputContainer,
  InputUsernameContainer,
  InputPasswordContainer,
  InputCheckPasswordContainer,
  InputNicknameContainer,
  UploadContainer,
  ErrorSignUpTextContainer,
  StyledUpload,
  ButtonContainer,
} from './styles';
import { Image } from 'antd';
import { CustomInput } from '../../components/Input';
import { debounce } from 'lodash';
import { useCustomNavigate } from '../../hooks';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import CustomButton from '../../components/Button';
import { useMutation } from '@tanstack/react-query';
import { memberAPI } from '../../apis/member';
import imageCompression from 'browser-image-compression';

const SignUp = () => {
  const navigate = useNavigate();
  const accessToken = getCookie('accessToken');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [backError, setBackError] = useState(false);
  const [frontError, setFrontError] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { handleChangeUrl } = useCustomNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
      }}
      type="button"
    >
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: '1vh' }}>Upload</div>
      </div>
    </button>
  );

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckPasswordChange = (e) => {
    setCheckPassword(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    if (checkPassword.length > 0 && password.length > 0) {
      const check = password === checkPassword;
      check ? setFrontError(false) : setFrontError(true);
    } else if (checkPassword.length === 0 && password.length === 0)
      setFrontError(false);
  }, [password, checkPassword]);

  useEffect(() => {
    if (accessToken) {
      navigate('/', { replace: true });
    }
  }, [accessToken, navigate]);

  const beforeUpload = () => false;
  const getBase64 = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 101,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.readAsDataURL(compressedFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    } catch (error) {
      return null;
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  useEffect(() => {
    const updateProfileImage = async () => {
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const imageBase64 = await getBase64(file);
        setProfileImage(imageBase64);
      } else {
        setProfileImage(null);
      }
    };

    updateProfileImage();
  }, [fileList]);

  useEffect(() => {
    const isValid =
      username.length > 0 &&
      password.length > 0 &&
      checkPassword.length > 0 &&
      password === checkPassword &&
      profileImage !== null;
    setIsFormValid(isValid);
  }, [username, password, checkPassword, profileImage]);

  const signUpData = {
    username: username,
    password: password,
    nickname: nickname,
    profileImage: profileImage,
  };

  console.log(signUpData);
  const mutation = useMutation({
    mutationFn: async (data) => {
      await memberAPI.signUpAPI(data);
    },
    onSuccess: (response) => {
      console.log(response);
      handleChangeUrl('/login');
    },

    onError: (error) => {
      setBackError(true);
    },
  });

  const debouncedSignUp = useCallback(
    debounce((data) => {
      mutation.mutate(data);
    }, 300),
    [],
  );
  return (
    <Container>
      <SignUpWrapper>
        <SignUpTextContainer>회원가입</SignUpTextContainer>
        <Inner>
          <InputContainer>
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
            {backError && (
              <ErrorSignUpTextContainer>
                이미 존재하는 아이디입니다.
              </ErrorSignUpTextContainer>
            )}
            {backError ? (
              <InputPasswordContainer hasError={true}>
                <CustomInput
                  type={'password'}
                  width={'20vw'}
                  height={'6vh'}
                  fontSize={'1vw'}
                  text={'비밀번호 입력'}
                  onChange={handlePasswordChange}
                />
              </InputPasswordContainer>
            ) : (
              <InputPasswordContainer hasError={false}>
                <CustomInput
                  type={'password'}
                  width={'20vw'}
                  height={'6vh'}
                  fontSize={'1vw'}
                  text={'비밀번호 입력'}
                  onChange={handlePasswordChange}
                />
              </InputPasswordContainer>
            )}
            <InputCheckPasswordContainer>
              <CustomInput
                type={'password'}
                width={'20vw'}
                height={'6vh'}
                fontSize={'1vw'}
                text={'비밀번호 확인'}
                onChange={handleCheckPasswordChange}
              />
            </InputCheckPasswordContainer>
            {frontError && (
              <ErrorSignUpTextContainer>
                비밀번호가 일치하지 않습니다.
              </ErrorSignUpTextContainer>
            )}
            {frontError ? (
              <InputNicknameContainer hasError={true}>
                <CustomInput
                  type={'text'}
                  width={'20vw'}
                  height={'6vh'}
                  fontSize={'1vw'}
                  text={'닉네임 입력'}
                  onChange={handleNicknameChange}
                />
              </InputNicknameContainer>
            ) : (
              <InputNicknameContainer hasError={false}>
                <CustomInput
                  type={'text'}
                  width={'20vw'}
                  height={'6vh'}
                  fontSize={'1vw'}
                  text={'닉네임 입력'}
                  onChange={handleNicknameChange}
                />
              </InputNicknameContainer>
            )}
          </InputContainer>
          <UploadContainer>
            <CustomText
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1.1vw'}
              color={COLORS.NAVY}
              text={'프로필 업로드'}
            ></CustomText>
            <StyledUpload
              name="files"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }} // Correct usage
            >
              {fileList.length >= 1 ? null : uploadButton}
            </StyledUpload>
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
              style={{ display: 'none' }}
            />
          </UploadContainer>
        </Inner>
        <ButtonContainer>
          <CustomButton
            text={'이전'}
            color={COLORS.WHITE}
            width={'7vw'}
            height={'8vh'}
            fontSize={'1.1vw'}
            backgroundColor={COLORS.NAVY}
            borderColor={COLORS.NAVY}
            onClick={handleBack}
          ></CustomButton>
          <CustomButton
            text={'회원가입'}
            color={COLORS.WHITE}
            width={'10vw'}
            height={'8vh'}
            fontSize={'1.1vw'}
            backgroundColor={COLORS.ORANGE}
            borderColor={COLORS.ORANGE}
            onClick={(e) => {
              e.preventDefault();
              debouncedSignUp(signUpData);
            }}
            disabled={!isFormValid}
          ></CustomButton>
        </ButtonContainer>
      </SignUpWrapper>
    </Container>
  );
};

export default SignUp;
