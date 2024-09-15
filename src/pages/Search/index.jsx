import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  TabsContainer,
  StyledTabs,
  Inner,
  SortInner,
  ContentInner,
  TagImage,
  ProfileImageContainer,
  TextContainer,
  StyledTitleSkeleton,
  StyledContentSkeleton,
  StyledCountSkeleton,
  StyledProfileSkeleton,
  InputContainer,
} from './styles';
import { sskcookAPI } from '../../apis/sskcook';
import { debounce } from 'lodash';
import CustomTextButton from '../../components/Button/Text';
import { COLORS, TAG_VALUES } from '../../constants';
import { CustomSearchInput } from '../../components/Input';
import instance from '../../apis';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import CustomText from '../../components/Text';
import { CardContainer, CardWrapper } from '../Tag/styles';
import Card from '../../components/Card';
import { StyledSskcookSkeleton } from '../Home/styles';
import { useCustomNavigate } from '../../hooks';
const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [isSort, setIsSort] = useState('latest');
  const [isTag, setIsTag] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isNull, setIsNull] = useState(false);
  const queryClient = useQueryClient();
  const prevSearchValueRef = useRef('');
  const { handleChangeUrl } = useCustomNavigate();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const skeletonSskcooks = Array.from({ length: 10 }).map((_, index) => (
    <div
      key={index}
      style={{
        display: 'inline-flex',
        gap: '1vw',
        alignItems: 'center',
      }}
    >
      <StyledSskcookSkeleton />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1vw',
        }}
      >
        <StyledTitleSkeleton />
        <StyledContentSkeleton />
      </div>
    </div>
  ));

  const skeletonMembers = Array.from({ length: 10 }).map((_, index) => (
    <div
      key={index}
      style={{
        display: 'inline-flex',
        gap: '1vw',
        alignItems: 'center',
      }}
    >
      <StyledProfileSkeleton />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1vw',
        }}
      >
        <StyledTitleSkeleton />
        <StyledCountSkeleton />
      </div>
    </div>
  ));

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsClicked(true);
      setIsFirst(false);
      triggerSearch(searchValue, activeTab, isSort);
    }
  };

  const fetchData = async (endpoint, pageParam = 1) => {
    const res = await instance.get(
      `${endpoint}?keyword=${searchValue}&sort=${isSort}&page=${pageParam}`,
    );
    return res.data;
  };

  const {
    data: recentData,
    fetchNextPage: fetchNextPageRecent,
    hasNextPage: hasNextPageRecent,
    isFetching: isFetchingRecent,
  } = useInfiniteQuery({
    queryKey: ['SskcookRecentSearch', isSort],
    queryFn: ({ pageParam = 1 }) => fetchData('/sskcook', pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    staleTime: 0,
    cacheTime: 0,
    enabled: isClicked && activeTab === '1' && searchValue.length > 0,
    onSuccess: () => setIsClicked(false),
  });

  const {
    data: likeData,
    fetchNextPage: fetchNextPageLike,
    hasNextPage: hasNextPageLike,
    isFetching: isFetchingLike,
  } = useInfiniteQuery({
    queryKey: ['SskcookLikeSearch', isSort],
    queryFn: ({ pageParam = 1 }) => fetchData('/sskcook', pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    staleTime: 0,
    cacheTime: 0,
    enabled: isClicked && activeTab === '1' && searchValue.length > 0,
    onSuccess: () => setIsClicked(false),
  });

  const {
    data: memberData,
    fetchNextPage: fetchNextPageMember,
    hasNextPage: hasNextPageMember,
    isFetching: isFetchingMember,
  } = useInfiniteQuery({
    queryKey: ['MemberSearch'],
    queryFn: ({ pageParam = 1 }) => fetchData('/member', pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    staleTime: 0,
    cacheTime: 0,
    enabled: isClicked && activeTab === '3' && searchValue.length > 0,
    onSuccess: () => setIsClicked(false),
  });

  const sskcookSearchRecentData =
    recentData?.pages.flatMap((page) => page.data) || [];
  const sskcookSearchLikeData =
    likeData?.pages.flatMap((page) => page.data) || [];
  const memberSearchData = memberData?.pages.flatMap((page) => page.data) || [];

  const handleItemClick = (data, itemId) => {
    const index = data.findIndex((item) => item.sskcookId === itemId);
    return index;
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const documentHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (windowHeight + scrollTop >= documentHeight - 1) {
        if (
          activeTab === '1' &&
          isSort === 'latest' &&
          hasNextPageRecent &&
          !isFetchingRecent
        ) {
          fetchNextPageRecent();
        } else if (
          activeTab === '1' &&
          isSort === 'likes' &&
          hasNextPageLike &&
          !isFetchingLike
        ) {
          fetchNextPageLike();
        } else if (
          activeTab === '3' &&
          hasNextPageMember &&
          !isFetchingMember
        ) {
          fetchNextPageMember();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    activeTab,
    isSort,
    fetchNextPageRecent,
    fetchNextPageLike,
    fetchNextPageMember,
    hasNextPageRecent,
    hasNextPageLike,
    hasNextPageMember,
    isFetchingRecent,
    isFetchingLike,
    isFetchingMember,
  ]);

  const triggerSearch = (value, tab) => {
    if (value.length === 0) {
      setIsNull(true);
    } else {
      setIsNull(false);
    }

    if (tab === '2') {
      if (value.length === 0) {
        setIsTag([]);
      } else {
        const matchingTags = TAG_VALUES.filter((tag) => tag.includes(value));
        setIsTag(matchingTags);
      }
    }

    if (value !== prevSearchValueRef.current) {
      queryClient.invalidateQueries('MemberSearch');
      queryClient.invalidateQueries('SskcookLikeSearch');
      queryClient.invalidateQueries('SskcookRecentSearch');
      prevSearchValueRef.current = value;
    }
  };

  const debouncedTriggerSearch = debounce(triggerSearch, 300);

  useEffect(() => {
    if (searchValue && isClicked) {
      debouncedTriggerSearch(searchValue, activeTab, isSort);
    }
    return () => {
      debouncedTriggerSearch.cancel();
    };
  }, [searchValue, activeTab, isSort, isClicked]);

  const handleSortChange = (sortType) => {
    setIsSort(sortType);
    if (searchValue) {
      triggerSearch(searchValue, activeTab, sortType);
    }
  };

  const onChangeTabs = (key) => {
    setActiveTab(key);
    if (searchValue) {
      triggerSearch(searchValue, key, isSort);
    }
  };

  useEffect(() => {
    setIsClicked(false);
  }, [searchValue.length]);

  const items = [
    {
      key: '1',
      label: '슥쿡',
      children: (
        <Inner>
          <SortInner>
            <CustomTextButton
              text={'최신순'}
              onClick={() => handleSortChange('latest')}
              style={{
                fontFamily: 'Happiness-Sans-Regular',
                color:
                  isSort === 'latest' ? `${COLORS.BLACK}` : `${COLORS.TAG}`,
              }}
              fontSize={'1vw'}
            />
            <CustomTextButton
              text={'인기순'}
              onClick={() => handleSortChange('likes')}
              style={{
                fontFamily: 'Happiness-Sans-Regular',
                color: isSort === 'likes' ? `${COLORS.BLACK}` : `${COLORS.TAG}`,
              }}
              fontSize={'1vw'}
            />
          </SortInner>
          <ContentInner>
            {isFetchingRecent || isFetchingLike ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3vw',
                }}
              >
                {skeletonSskcooks}
              </div>
            ) : (
              <>
                {isSort === 'latest' ? (
                  !isNull && sskcookSearchRecentData.length > 0 ? (
                    sskcookSearchRecentData.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '1vw',
                        }}
                      >
                        <CardContainer>
                          <CardWrapper>
                            <Card
                              url={item.sskcookUrl}
                              id={item.sskcookId}
                              type={'sskcook'}
                              color={COLORS.BLACK}
                              deleteAPI={sskcookAPI.sskcookDeleteAPI}
                              queryKey="sskcooks"
                              status={`search_recent: ${searchValue}`}
                              page={handleItemClick(
                                sskcookSearchRecentData,
                                item.sskcookId,
                              )}
                              width={'12vw'}
                              height={'42vh'}
                            />
                          </CardWrapper>
                        </CardContainer>
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <CustomText
                            text={item.title}
                            color={COLORS.BLACK}
                            fontFamily={'Happiness-Sans-Bold'}
                            fontSize={'1.2rem'}
                          />
                          <CustomText
                            text={item.nickname}
                            color={COLORS.TAG}
                            fontFamily={'Happiness-Sans-Regular'}
                            fontSize={'1vw'}
                          />
                        </div>
                      </div>
                    ))
                  ) : !isFirst ? (
                    <CustomText
                      text={'검색 결과가 없어요!'}
                      fontFamily={'Happiness-Sans-Bold'}
                      color={COLORS.DARKGRAPEFRUIT}
                      fontSize={'1rem'}
                    />
                  ) : null
                ) : !isNull && sskcookSearchLikeData.length > 0 ? (
                  sskcookSearchLikeData.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1vw',
                      }}
                    >
                      <CardContainer>
                        <CardWrapper>
                          <Card
                            url={item.sskcookUrl}
                            id={item.sskcookId}
                            color={COLORS.BLACK}
                            type={'sskcook'}
                            deleteAPI={sskcookAPI.sskcookDeleteAPI}
                            queryKey="sskcooks"
                            status={`search_likes: ${searchValue}`}
                            page={handleItemClick(
                              sskcookSearchLikeData,
                              item.sskcookId,
                            )}
                            width={'12vw'}
                            height={'42vh'}
                          />
                        </CardWrapper>
                      </CardContainer>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <CustomText
                          text={item.title}
                          color={COLORS.BLACK}
                          fontFamily={'Happiness-Sans-Bold'}
                          fontSize={'1.2rem'}
                        />
                        <CustomText
                          text={item.nickname}
                          color={COLORS.TAG}
                          fontFamily={'Happiness-Sans-Regular'}
                          fontSize={'1vw'}
                        />
                      </div>
                    </div>
                  ))
                ) : !isFirst ? (
                  <CustomText
                    text={'검색 결과가 없어요!'}
                    fontFamily={'Happiness-Sans-Bold'}
                    color={COLORS.DARKGRAPEFRUIT}
                    fontSize={'1rem'}
                  />
                ) : null}
              </>
            )}
          </ContentInner>
        </Inner>
      ),
    },
    {
      key: '2',
      label: '태그',
      children: (
        <Inner>
          <ContentInner>
            {isTag.length > 0 ? (
              isTag.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1vw',
                      }}
                      onClick={() =>
                        (window.location.href = `/sskcook?tag=${item}`)
                      }
                    >
                      <TagImage>
                        <CustomText
                          text={'#'}
                          fontFamily={'Happiness-Sans-Bold'}
                          color={COLORS.BLACK}
                          fontSize={'1.2rem'}
                        />
                      </TagImage>
                      <CustomText
                        text={item}
                        fontFamily={'Happiness-Sans-Regular'}
                        color={COLORS.BLACK}
                        fontSize={'1.2rem'}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))
            ) : isFirst ? null : (
              <CustomText
                text={'검색 결과가 없어요!'}
                fontFamily={'Happiness-Sans-Bold'}
                color={COLORS.DARKGRAPEFRUIT}
                fontSize={'1rem'}
              />
            )}
          </ContentInner>
        </Inner>
      ),
    },
    {
      key: '3',
      label: '크리에이터',
      children: (
        <Inner>
          <ContentInner>
            {isFetchingMember ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3vw',
                }}
              >
                {skeletonMembers}
              </div>
            ) : !isNull && memberSearchData.length > 0 ? (
              memberSearchData.map((item, index) => (
                <div key={index} style={{ display: 'flex' }}>
                  <div
                    style={{
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '1vw',
                    }}
                    onClick={() =>
                      handleChangeUrl(`/subscription/${item.username}`)
                    }
                  >
                    <ProfileImageContainer src={item.profileImage} />
                    <TextContainer>
                      <CustomText
                        text={item.nickname}
                        color={COLORS.BLACK}
                        fontSize={'1.5vw'}
                        fontFamily={'Happiness-Sans-Bold'}
                      />
                      <CustomText
                        text={`구독자 ${item.subscriptionCount}명 | 슥쿡 ${item.sskcookCount}개`}
                        color={COLORS.BLACK}
                        fontSize={'.8vw'}
                        fontFamily={'Happiness-Sans-Bold'}
                      />
                    </TextContainer>
                  </div>
                </div>
              ))
            ) : isFirst && !isNull ? null : (
              <CustomText
                text={'검색 결과가 없어요!'}
                fontFamily={'Happiness-Sans-Bold'}
                color={COLORS.DARKGRAPEFRUIT}
                fontSize={'1vw'}
              />
            )}
          </ContentInner>
        </Inner>
      ),
    },
  ];

  return (
    <Container>
      <InputContainer>
        <CustomSearchInput
          text={'슥쿡 / 태그 / 크리에이터 검색'}
          fontSize={'1rem'}
          width={'32vw'}
          height={'4vh'}
          type={'text'}
          onChange={handleChange}
          value={searchValue}
          onKeyDown={handleKeyDown}
        />
      </InputContainer>
      <TabsContainer>
        <StyledTabs
          defaultActiveKey="1"
          items={items}
          onChange={onChangeTabs}
        />
      </TabsContainer>
    </Container>
  );
};

export default Search;
