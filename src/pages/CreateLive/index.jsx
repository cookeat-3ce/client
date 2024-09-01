import React, { useState, useEffect } from 'react';
import {
  ClassNameInput,
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
} from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { Tooltip, Radio, Image, InputNumber } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TooltipIcon from '../../assets/icons/tooltip.svg';
import imageCompression from 'browser-image-compression';
import CustomButton from '../../components/Button';
import { CustomInput } from '../../components/Input';
import { useMutation } from '@tanstack/react-query';
import { liveAPI } from '../../apis/live';
import { useCustomNavigate } from '../../hooks';
import { useRecoilState } from 'recoil';
import { memberState } from '../../store';

const CreateLive = () => {
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

  const addLiveData = {
    username: username,
    title: className,
    people: maxParticipant,
    thumbnail: thumbnail,
    sessionId: 'asdf', // TODO: openvidu에서 주는 Session Id로 수정 필요
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      await liveAPI.addLiveAPI(data);
    },
    onSuccess: (response) => {
      console.log(response);
      handleChangeUrl('/'); // TODO: 추후 라이브 클래스 창으로 이동하도록 수정할 예정
    },

    onError: (error) => {
      setBackError(true);
    },
  });

  const handleClickSubmitButton = () => {
    console.log('addLiveData: ', addLiveData);
    mutation.mutate(addLiveData);
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

  // TODO: 30자 넘었을 때 에러 메시지 출력
  const handleClassName = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setClassName(value);
    }
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
                  <StyledRadio value="online">
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
            <InputContainer>
              <CustomText
                text="인원 수"
                fontSize="1.2rem"
                fontFamily="Happiness-Sans-Bold"
                color={COLORS.BLACK}
              />
              <InputNumber
                size="large"
                min={1}
                max={10}
                defaultValue={1}
                onChange={handleMaxParticipant}
              />
            </InputContainer>
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
        </RightContainer>
      </ContentContainer>
      <ButtonContainer>
        <CustomButton
          text={'취소'}
          color={COLORS.WHITE}
          width="4vw"
          height="4vh"
          fontSize="1rem"
          borderRadius={'100px'}
          fontFamily={'Happiness-Sans-Bold'}
          backgroundColor="#ADADAD"
          borderColor="#ADADAD"
          onClick={handleBack}
        ></CustomButton>
        <CustomButton
          text={'시작'}
          color={COLORS.WHITE}
          width="6vw"
          height="4vh"
          fontSize="1rem"
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
    </Container>
  );
};

export default CreateLive;
