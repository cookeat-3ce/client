import React, { useCallback, useEffect } from 'react';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import instance from '../../apis';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import CustomTextButton from '../../components/Button/Text';
import { AdminAPI } from '../../apis/admin';
import { debounce } from 'lodash';
/**
 * 크리에이터 인증 요청
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.09.11
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.11    양재혁       최초 생성
 * </pre>
 */
const AdminVerify = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['verify'],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/admin/member/verify?page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  const allData = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const documentHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (windowHeight + scrollTop >= documentHeight - 1) {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetching]);

  const mutation1 = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await AdminAPI.verifyAPI(data);
        return response;
      } catch (error) {
        throw new Error('error');
      }
    },
    onSuccess: (response) => {
      console.log(response);
    },
  });

  const mutation2 = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await AdminAPI.deleteVerifyAPI(data);
        return response;
      } catch (error) {
        throw new Error('error');
      }
    },
    onSuccess: (response) => {
      console.log(response);
    },
  });

  const debouncedVerify = useCallback(
    debounce((username) => {
      mutation1.mutate({ username });
    }, 100),
    [],
  );

  const debouncedDeleteVerify = useCallback(
    debounce((username) => {
      mutation2.mutate(username);
    }, 100),
    [],
  );

  return (
    <>
      <CustomText
        text={'크리에이터 인증 요청'}
        fontFamily={'Happiness-Sans-Bold'}
        fontSize={'1.5vw'}
      />
      <div
        style={{
          width: '70vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2vw',
          marginTop: '5vh',
        }}
      >
        {allData.map((item) => (
          <div
            key={item.sskcookId}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '70vw',
              height: '20vh',
              borderTop: `1px solid ${COLORS.TAG}`,
              borderBottom: `1px solid ${COLORS.TAG}`,
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1.2vw' }}
            >
              <CustomText
                text={item.username}
                fontFamily={'Happiness-Sans-Bold'}
                fontSize={'2vw'}
              />
              <CustomText
                text={`${item.followerCount} | ${item.sskcookCount}`}
                fontFamily={'Happiness-Sans-Regular'}
                color={COLORS.TAG}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3vw',
              }}
            >
              <CustomTextButton
                text={'선정'}
                onClick={(e) => {
                  e.preventDefault();
                  debouncedVerify(item.username);
                }}
              />
              <CustomTextButton
                text={'취소'}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(item.username);
                  debouncedDeleteVerify(item.username);
                }}
              />
            </div>
          </div>
        ))}
        {isFetching && <p>Loading more data...</p>}
      </div>
    </>
  );
};

export default AdminVerify;
