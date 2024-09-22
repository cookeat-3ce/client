import React, { useState, useCallback } from 'react';
import { DatePicker, Input } from 'antd';
import { Container } from './styles';
import CustomText from '../../components/Text';
import CustomButton from '../../components/Button';
import { COLORS } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { AdminAPI } from '../../apis/admin';
import { debounce } from 'lodash';
import { useCustomNavigate } from '../../hooks';
/**
 * 이벤트 등록
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.09.16
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.16    양재혁       최초 생성
 * </pre>
 */
const AdminEvent = () => {
  const { RangePicker } = DatePicker;
  const { handleChangeUrl } = useCustomNavigate();
  const { TextArea } = Input;

  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnail(event.target.result);
      };
      reader.readAsDataURL(file);
    } else setThumbnail(null);
  };

  const handleRangePickerChange = (dates) => {
    if (dates) {
      setStartDate(dates[0] ? dates[0].toISOString() : null);
      setEndDate(dates[1] ? dates[1].toISOString() : null);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const postData = {
    title,
    content,
    startdate: startDate,
    enddate: endDate,
    thumbnail,
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await AdminAPI.postEvent(data);
        return response;
      } catch (error) {
        throw new Error('error');
      }
    },
    onSuccess: () => {
      handleChangeUrl('/admin');
    },
  });

  const debouncedPost = useCallback(
    debounce((data) => {
      mutation.mutate(data);
    }, 100),
    [],
  );

  return (
    <>
      <CustomText
        text={'이벤트 등록'}
        fontFamily={'Happiness-Sans-Bold'}
        fontSize={'1.5vw'}
      />
      <Container>
        <CustomText
          text={'제목'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1vw'}
        />
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <CustomText
          text={'내용'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1vw'}
        />
        <TextArea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <CustomText
          text={'이미지'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1vw'}
        />
        <label>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <CustomButton
            text={'파일 선택'}
            color={COLORS.WHITE}
            width={'6vw'}
            height={'4vh'}
            fontSize={'.9rem'}
            borderRadius={'100px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.ORANGE}
            borderColor={COLORS.ORANGE}
            onClick={() => document.querySelector('input[type="file"]').click()}
          />
        </label>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="Thumbnail"
            style={{ width: '20vw', height: '20vw' }}
          />
        ) : null}
        <CustomText
          text={'기간'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1vw'}
        />
        <RangePicker showTime onChange={handleRangePickerChange} />
        <CustomButton
          text={'등록'}
          color={COLORS.WHITE}
          width={'6vw'}
          height={'4vh'}
          fontSize={'.9rem'}
          borderRadius={'100px'}
          fontFamily={'Happiness-Sans-Bold'}
          backgroundColor={COLORS.ORANGE}
          borderColor={COLORS.ORANGE}
          onClick={(e) => {
            e.preventDefault();
            debouncedPost(postData);
          }}
        />
      </Container>
    </>
  );
};

export default AdminEvent;
