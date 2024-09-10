import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import React, { useEffect, useCallback } from 'react';
import instance from '../../apis';
import { AdminAPI } from '../../apis/admin';
import { message } from 'antd';
import { debounce } from 'lodash';
import { COLORS } from '../../constants';
import CustomTextButton from '../../components/Button/Text';
import CustomText from '../../components/Text';
import { useCustomNavigate } from '../../hooks';

const AdminReport = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['report'],
    queryFn: ({ pageParam = 1 }) =>
      instance.get(`/admin/report?page=${pageParam}`).then((res) => res.data),
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

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await AdminAPI.deleteSskcookAPI(data);
        return response;
      } catch (error) {
        throw new Error('error');
      }
    },
    onSuccess: (response) => {
      message.success('삭제되었습니다', 5);
    },
  });

  const debouncedReport = useCallback(
    debounce((sskcookId) => {
      mutation.mutate({ sskcookId });
    }, 100),
    [],
  );
  return (
    <div
      style={{
        width: '70vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2vw',
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
              text={item.title}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'2vw'}
            />
            <CustomText
              text={item.reportCount}
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
              text={'영상 보기'}
              onClick={() => {
                handleChangeUrl(`/sskcook/${item.sskcookId}`);
              }}
            />
            <CustomTextButton
              text={'삭제'}
              onClick={(e) => {
                e.preventDefault();
                debouncedReport(item.sskcookId);
              }}
            />
          </div>
        </div>
      ))}
      {isFetching && <p>Loading more data...</p>}
    </div>
  );
};

export default AdminReport;
