import React, { useState, useEffect } from 'react';
import {
  Container,
  PageTitleContainer,
  InputContainer,
  LeftContainer,
  RightContainer,
  TooltipIconWrapper,
  ContentContainer,
  RadioWrapper,
  RadioLabel,
  RadioContainer,
  StyledUpload,
  StyledRadio,
  UploadContainer,
  ButtonContainer,
  CustomInputNumber,
  ParticipantTitleWrapper,
} from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { Tooltip, Radio, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TooltipIcon from '../../assets/icons/tooltip.svg';
import imageCompression from 'browser-image-compression';
import CustomButton from '../../components/Button';
import { CustomInput } from '../../components/Input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { liveAPI } from '../../apis/live';
import { useCustomNavigate } from '../../hooks';
import { useRecoilState } from 'recoil';
import { memberState } from '../../store';
import axios from 'axios';
import { memberAPI } from '../../apis/member';
import VerifyModal from '../../components/VerifyModal';

const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;

const CreateLive = () => {
  const [verifiedStatus, setVerifiedStatus] = useState(null);
  const [member] = useRecoilState(memberState);
  const username = member.username;
  const [classType, setClassType] = useState('live');
  const [maxParticipant, setMaxParticipant] = useState(1);
  const [className, setClassName] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { handleChangeUrl } = useCustomNavigate();
  const [backError, setBackError] = useState(false);
  const [showError, setShowError] = useState(false);

  const [sessionId, setSessionId] = useState(null);

  const [showVerifiedModal, setShowVerifiedModal] = useState(false);

  const verifyCheckQuery = useQuery({
    queryKey: ['verifyCheck'],
    queryFn: () => memberAPI.verifyCheckAPI(username),
    staleTime: Infinity,
  });

  const mutationLiveAdd = useMutation({
    mutationFn: async (data) => {
      await liveAPI.addLiveAPI(data);
    },
    onSuccess: (response) => {
      handleChangeUrl(
        `/live${classType === 'class' ? '/class' : ''}/${sessionId}`,
      );
    },

    onError: (error) => {
      setBackError(true);
    },
  });

  const mutationVerifyRequest = useMutation({
    mutationFn: async () => {
      await memberAPI.verifyRequestAPI(username);
    },
    onSuccess: (response) => {
      console.log(response);
    },

    onError: (error) => {
      setBackError(true);
    },
  });

  const handleClickSubmitButton = async () => {
    const sessionId = await createSession();
    setSessionId(sessionId);

    console.log('sessionId: ', sessionId);

    const addLiveData = {
      username: username,
      title: className,
      people: maxParticipant,
      thumbnail: thumbnail,
      sessionId: sessionId,
      type: classType === 'class' ? 0 : 1,
    };

    mutationLiveAdd.mutate(addLiveData);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleMaxParticipant = (value) => {
    console.log('change max participant: ', value);
    setMaxParticipant(value);
  };

  const createSession = async () => {
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
        {},
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data.id;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  };

  const handleClassName = (e) => {
    const value = e.target.value;
    if (value.length > 30) {
      setShowError(true);
    } else {
      setShowError(false);
      setClassName(value);
    }
  };

  const openVerifiedModal = () => {
    setShowVerifiedModal(true);
  };

  const closeVerifiedModal = () => {
    setShowVerifiedModal(false);
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

  const handleSubmitVerify = () => {
    mutationVerifyRequest.mutate();
    handleChangeUrl('/');
  };

  useEffect(() => {
    if (verifiedStatus && verifiedStatus !== 'VERIFIED') {
      openVerifiedModal();
    }
  }, [verifiedStatus]);

  useEffect(() => {
    const updateThumbnail = async () => {
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const imageBase64 = await getBase64(file);
        setThumbnail(imageBase64);
      } else {
        setThumbnail(null);
      }
    };

    updateThumbnail();
  }, [fileList]);

  useEffect(() => {
    if (verifyCheckQuery.data) {
      console.log(verifyCheckQuery.data.data);
      setVerifiedStatus(verifyCheckQuery.data.data);
    }
  }, [verifyCheckQuery.data]);

  const onTypeChange = (e) => {
    console.log('radio checked', e.target.value);
    setClassType(e.target.value);
  };

  return (
    <Container>
      <PageTitleContainer>
        <CustomText
          text="라이브 클래스 열기"
          fontSize="1.5rem"
          fontFamily="Happiness-Sans-Bold"
          color={COLORS.BLACK}
        />
      </PageTitleContainer>
      {verifiedStatus && verifiedStatus === 'VERIFIED' && (
        <>
          <ContentContainer>
            <LeftContainer>
              <InputContainer>
                <CustomText
                  text="요리 클래스명"
                  fontSize="1.2rem"
                  fontFamily="Happiness-Sans-Bold"
                  color={COLORS.BLACK}
                />
                <CustomInput
                  type={'text'}
                  width={'18vw'}
                  height={'6vh'}
                  fontSize={'.8vw'}
                  onChange={handleClassName}
                />
                {showError && (
                  <CustomText
                    text={'제목은 30자까지 작성 가능합니다.'}
                    fontSize=".8rem"
                    fontFamily="Happiness-Sans-Regular"
                    color={COLORS.DARKGRAPEFRUIT}
                  />
                )}
              </InputContainer>
              <InputContainer>
                <CustomText
                  text="클래스 종류"
                  fontSize="1.2rem"
                  fontFamily="Happiness-Sans-Bold"
                  color={COLORS.BLACK}
                />
                <RadioContainer>
                  <Radio.Group onChange={onTypeChange} value={classType}>
                    <RadioWrapper>
                      <StyledRadio value="live">
                        <RadioLabel>
                          <CustomText
                            text="요라(요리 라이브)"
                            fontSize="1rem"
                            fontFamily="Happiness-Sans-Regular"
                            color={COLORS.BLACK}
                          />
                          <Tooltip
                            title={
                              <>
                                인원 제한이 없지만
                                <br />
                                참여자는 카메라를 켤 수 없어요.
                              </>
                            }
                            color={COLORS.ORANGE}
                            overlayInnerStyle={{
                              textAlign: 'center',
                            }}
                          >
                            <TooltipIconWrapper src={TooltipIcon} />
                          </Tooltip>
                        </RadioLabel>
                      </StyledRadio>
                    </RadioWrapper>
                    <RadioWrapper>
                      <StyledRadio value="class">
                        <RadioLabel>
                          <CustomText
                            text="온라인 클래스"
                            fontSize="1rem"
                            fontFamily="Happiness-Sans-Regular"
                            color={COLORS.BLACK}
                          />
                          <Tooltip
                            title={
                              <>
                                참여자 모두 카메라를 켤 수 있지만
                                <br />
                                인원 제한이 있어요.
                              </>
                            }
                            color={COLORS.ORANGE}
                            overlayInnerStyle={{
                              textAlign: 'center',
                            }}
                          >
                            <TooltipIconWrapper src={TooltipIcon} />
                          </Tooltip>
                        </RadioLabel>
                      </StyledRadio>
                    </RadioWrapper>
                  </Radio.Group>
                </RadioContainer>
                {classType === 'class' && (
                  <InputContainer>
                    <ParticipantTitleWrapper>
                      <CustomText
                        text="인원 수"
                        fontSize="1.2rem"
                        fontFamily="Happiness-Sans-Bold"
                        color={COLORS.BLACK}
                      />
                      <Tooltip
                        title="최대 10명까지 설정할 수 있어요."
                        color={COLORS.ORANGE}
                        overlayInnerStyle={{
                          textAlign: 'center',
                        }}
                      >
                        <TooltipIconWrapper src={TooltipIcon} />
                      </Tooltip>
                    </ParticipantTitleWrapper>
                    <CustomInputNumber
                      min={1}
                      max={10}
                      defaultValue={1}
                      size="large"
                      onChange={(value) => console.log(value)}
                    />
                  </InputContainer>
                )}
              </InputContainer>
            </LeftContainer>
            <RightContainer>
              <CustomText
                text="썸네일"
                fontSize="1.2rem"
                fontFamily="Happiness-Sans-Bold"
                color={COLORS.BLACK}
              />
              <UploadContainer>
                <StyledUpload
                  name="files"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleFileChange}
                  beforeUpload={beforeUpload}
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                  }} // Correct usage
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </StyledUpload>
                <Image
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                  style={{ display: 'none' }}
                />
              </UploadContainer>
            </RightContainer>
          </ContentContainer>
          <ButtonContainer>
            <CustomButton
              text={'취소'}
              color={COLORS.WHITE}
              width={'4vw'}
              height={'4vh'}
              fontSize={'1rem'}
              borderRadius={'100px'}
              fontFamily={'Happiness-Sans-Bold'}
              backgroundColor="#ADADAD"
              borderColor="#ADADAD"
              onClick={handleBack}
            ></CustomButton>
            <CustomButton
              text={'시작'}
              color={COLORS.WHITE}
              width={'6vw'}
              height={'4vh'}
              fontSize={'1rem'}
              borderRadius={'100px'}
              fontFamily={'Happiness-Sans-Bold'}
              backgroundColor={COLORS.ORANGE}
              borderColor={COLORS.ORANGE}
              onClick={(e) => {
                e.preventDefault();
                handleClickSubmitButton();
              }}
            ></CustomButton>
          </ButtonContainer>
        </>
      )}
      <VerifyModal
        show={showVerifiedModal}
        verifiedStatus={verifiedStatus}
        onClose={closeVerifiedModal}
        onSubmit={handleSubmitVerify}
      ></VerifyModal>
    </Container>
  );
};

export default CreateLive;
