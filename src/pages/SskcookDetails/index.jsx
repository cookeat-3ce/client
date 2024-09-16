import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  SwitchContainer,
  StyledSwitch,
  DetailsContainer,
  VideoContainer,
  WriteContainer,
  TagContainer,
  TagInner,
  IngredientContainer,
  IngredientInner,
  IngredientWrapper,
  IngredientSection,
  LineContainer,
  RecipeContainer,
  RecipeInner,
  SubscriptionContainer,
  StyledSkeleton,
  SwitchSkeleton,
  LineContainer2,
} from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sskcookAPI } from '../../apis/sskcook';
import { memberState } from '../../store';
import { useRecoilState } from 'recoil';
import CustomButton from '../../components/Button';
import ReactPlayer from 'react-player/lazy';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import Share from '../../assets/icons/share.svg';
import Bookmark from '../../assets/icons/bookmark.svg';
import Like from '../../assets/icons/thumbs_up.svg';
import Siren from '../../assets/icons/siren.svg';
import ClickedShare from '../../assets/icons/clicked_share.svg';
import ClickedBookmark from '../../assets/icons/clicked_bookmark.svg';
import ClickedLike from '../../assets/icons/clicked_thumbs_up.svg';
import ClickedSiren from '../../assets/icons/clicked_siren.svg';
import Pause from '../../assets/icons/pause.svg';
import Play from '../../assets/icons/play.svg';
import Link from '../../assets/icons/link.svg';
import KakaoIcon from '../../assets/icons/kakao.svg';
import { getCookie } from '../../hooks';
import { message, Menu, Dropdown, Tooltip } from 'antd';
import { memberAPI } from '../../apis/member';
import CustomImageButton from '../../components/Button/Image';
import { useCustomNavigate } from '../../hooks';
import SalesIcon from '../../assets/icons/sale.svg';
import { INGREDIENTS } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import instance from '../../apis';
import { useInfiniteQuery } from '@tanstack/react-query';
import SalesNavyIcon from '../../assets/icons/sale_navy.svg';
import MikeIcon from '../../assets/icons/mike.svg';
import { fridgeAPI } from '../../apis/fridge';

const SskcookDetails = () => {
  const sskcookId = window.location.pathname.split('/').pop();
  const containerRef = useRef(null);
  const [ingredient, setIngredients] = useState([]);
  const [member, setMember] = useRecoilState(memberState);
  const [isSirenClicked, setIsSirenClicked] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);
  const [isSubscriptionClicked, setIsSubscriptionClicked] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const { Kakao } = window;
  const playerRef = useRef(null);
  const { handleChangeUrl } = useCustomNavigate();
  const { transcript } = useSpeechRecognition();
  const location = useLocation();
  const state = location.state;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${year}-${formattedMonth}`;
  const [isPlaying, setIsPlaying] = useState(true);
  const word = transcript.split(' ');
  const navigate = useNavigate();

  useEffect(() => {
    setIsPlaying(true);
  }, [location.pathname]);

  const getRandomNumber = useCallback((min, max) => {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.round(randomNum / 100) * 100;
  }, []);
  const [keyword, setKeyword] = useState('');
  const [flag, setFlag] = useState('');
  const [page, setPage] = useState('');

  useEffect(() => {
    if (!state?.key || !state.key?.status) {
      setFlag(0);
      setPage(null);
      setKeyword('');
      return;
    }

    const stateValue = state.key;
    const stateString = state.key.status;

    if (stateString === 'recent') {
      setFlag(1);
      setPage(stateValue.transformedPage);
    } else if (stateString === 'month') {
      setFlag(2);
      setPage(stateValue.transformedPage);
    } else if (stateString === 'stored') {
      setFlag(3);
      setPage(stateValue.transformedPage);
    } else if (stateString.substring(0, 10) === 'subscribe_') {
      setFlag(4);
      setKeyword(stateString.substring(11, stateString.length));
      setPage(stateValue.transformedPage);
    } else if (stateString.substring(0, 14) === 'search_recent:') {
      setFlag(5);
      setKeyword(stateString.substring(15, stateString.length));
      setPage(stateValue.transformedPage);
    } else if (stateString.substring(0, 4) === 'tag:') {
      setFlag(6);
      setKeyword(stateString.substring(5, stateString.length));
      setPage(stateValue.transformedPage);
    } else if (stateString === 'fridge') {
      setFlag(8);
      setPage(stateValue.transformedPage);
    } else {
      setFlag(7);
      setKeyword(stateString.substring(14, stateString.length));
      setPage(stateValue.transformedPage);
    }
  }, [state]);

  // console.log(flag, keyword);

  // console.log(page);

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO_INIT_KEY);
  }, []);

  const fetchMyIngredients = async () => {
    try {
      const response = await fridgeAPI.getIngredientsAPI();
      setIngredients(response.data || []);
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    }
  };

  useEffect(() => {
    fetchMyIngredients();
  }, []);

  const {
    data: recentData,
    fetchNextPage: recentFetchNextPage,
    hasNextPage: recentHasNextPage,
    isFetching: recentIsFetching,
    hasPreviousPage: recentHasPrevPage,
    fetchPreviousPage: recentFetchPrevPage,
  } = useInfiniteQuery({
    queryKey: ['SskcookRecent'],
    queryFn: ({ pageParam = page }) =>
      instance
        .get(`/sskcook?sort=latest&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length + 1 : undefined;
    },
    enabled: flag === 1,
  });
  const {
    data: dateData,
    fetchNextPage: dateFetchNextPage,
    hasNextPage: dateHasNextPage,
    isFetching: dateIsFetching,
    hasPreviousPage: dateHasPrevPage,
    fetchPreviousPage: dateFetchPrevPage,
  } = useInfiniteQuery({
    queryKey: ['foremattedDate', formattedDate],
    queryFn: ({ pageParam = page }) =>
      instance
        .get(`/sskcook?date=${formattedDate}&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length + 1 : undefined;
    },
    enabled: flag === 2,
  });

  const {
    data: fetchedSskcookList,
    fetchNextPage: fetchSskcookNextPage,
    hasNextPage: hasSskcookNextPage,
    isFetchingNextPage: isSskcookFetching,
    fetchPreviousPage: fetchSskcookPrevPage,
    hasPreviousPage: fetchHasPrevPage,
  } = useInfiniteQuery({
    queryKey: ['userSskcookList', keyword],
    queryFn: ({ pageParam = page }) =>
      instance.get(`/sskcook/list/${keyword}?page=${pageParam}`).then((res) => {
        return res.data;
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length + 1 : undefined;
    },
    enabled: flag === 4,
  });

  const {
    data: recentSearchData,
    fetchNextPage: fetchNextPageRecent,
    hasNextPage: hasNextPageRecent,
    isFetching: isFetchingRecent,
    hasPreviousPage: recentSearchHasPrevPage,
    fetchPreviousPage: recentSearchFetchPrev,
  } = useInfiniteQuery({
    queryKey: ['SskcookRecentSearch'],
    queryFn: ({ pageParam = page }) =>
      instance
        .get(`/sskcook?keyword=${keyword}&sort=latest&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length + 1 : undefined;
    },
    enabled: flag === 5,
  });

  const {
    data: likeData,
    fetchNextPage: fetchNextPageLike,
    hasNextPage: hasNextPageLike,
    isFetching: isFetchingLike,
    hasPreviousPage: likeHasPrevPage,
    fetchPreviousPage: likeFetchPrevPage,
  } = useInfiniteQuery({
    queryKey: ['SskcookLikeSearch'],
    queryFn: ({ pageParam = page }) =>
      instance
        .get(`/sskcook?keyword=${keyword}&sort=likes&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length + 1 : undefined;
    },
    enabled: flag === 7,
  });

  const {
    data: tagData,
    fetchNextPage: tagFetchNextPage,
    hasNextPage: tagHasNextPage,
    isFetching: tagIsFetching,
    hasPreviousPage: tagHasPrevPage,
    fetchPreviousPage: tagFetchPrevPage,
  } = useInfiniteQuery({
    queryKey: ['tag', keyword],
    queryFn: ({ pageParam = page }) =>
      instance
        .get(`/sskcook?tag=${keyword}&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length + 1 : undefined;
    },
    enabled: flag === 6,
  });

  const {
    data: storeData,
    fetchNextPage: storeFetchNextPage,
    hasNextPage: storeHasNextPage,
    isFetching: storeIsFetching,
    hasPreviousPage: storeHasPreviousPage,
    fetchPreviousPage: storeFetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['Stored'],
    queryFn: ({ pageParam = page }) =>
      instance.get(`/member/sskcook?page=${pageParam}`).then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length + 1 : undefined;
    },
    enabled: flag === 3,
  });

  const recommendsRecipeQuery = useQuery({
    queryKey: ['recommends', member.username],
    queryFn: () => sskcookAPI.getSskcookRecommendsAPI(),
    enabled: flag === 8,
  });
  useEffect(() => {
    if (recommendsRecipeQuery.data) {
      setFridgeSskcookAllData(recommendsRecipeQuery.data.data);
      console.log(recommendsRecipeQuery.data.data);
    }
  }, [recommendsRecipeQuery.data]);
  const [recentAllData, setRecentAllData] = useState([]);
  const [tagAllData, setTagAllData] = useState([]);
  const [storeAllData, setStoreAllData] = useState([]);
  const [dateAllData, setDateAllData] = useState([]);
  const [recentSearchAllData, setRecentSearchAllData] = useState([]);
  const [likeSearchAllData, setLikeSearchAllData] = useState([]);
  const [fetchSskcookAllData, setFetchSskcookAllData] = useState([]);
  const [fridgeSskcookAllData, setFridgeSskcookAllData] = useState([]);
  useEffect(() => {
    if (recentData?.pages) {
      const allData = recentData.pages.flatMap((page) => page.data);
      setRecentAllData(allData);
    }
  }, [recentData]);

  useEffect(() => {
    if (likeData?.pages) {
      const allData = likeData.pages.flatMap((page) => page.data);
      setLikeSearchAllData(allData);
    }
  }, [likeData]);

  useEffect(() => {
    if (tagData?.pages) {
      const allData = tagData.pages.flatMap((page) => page.data);
      setTagAllData(allData);
    }
  }, [tagData]);

  useEffect(() => {
    if (storeData?.pages) {
      const allData = storeData.pages.flatMap((page) => page.data);
      setStoreAllData(allData);
    }
  }, [storeData]);

  useEffect(() => {
    if (dateData?.pages) {
      const allData = dateData.pages.flatMap((page) => page.data);
      setDateAllData(allData);
    }
  }, [dateData]);

  useEffect(() => {
    if (recentSearchData?.pages) {
      const allData = recentSearchData.pages.flatMap((page) => page.data);
      setRecentSearchAllData(allData);
    }
  }, [recentSearchData]);

  useEffect(() => {
    if (fetchedSskcookList?.pages) {
      const allData = fetchedSskcookList.pages.flatMap((page) => page.data);
      setFetchSskcookAllData(allData);
    }
  }, [fetchedSskcookList]);

  // console.log(fridgeData.pages);
  console.log(fridgeSskcookAllData);
  let index1 = recentAllData?.findIndex(
    (item) => item.sskcookId === Number(sskcookId),
  );

  let index2 = dateAllData?.findIndex(
    (item) => item.sskcookId === Number(sskcookId),
  );

  let index3 = storeAllData?.findIndex(
    (item) => item.sskcookId === Number(sskcookId),
  );

  let index4 = fetchSskcookAllData?.findIndex(
    (item) => item.sskcookId === Number(sskcookId),
  );

  let index5 = recentSearchAllData?.findIndex(
    (item) => item.sskcookId === Number(sskcookId),
  );

  let index6 = tagAllData?.findIndex(
    (item) => item.sskcookId === Number(sskcookId),
  );

  let index7 = likeSearchAllData?.findIndex(
    (item) => item.sskcookId === Number(sskcookId),
  );

  let index8 = fridgeSskcookAllData?.findIndex(
    (item) => item.sskcookId === Number(sskcookId),
  );

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      await handleScroll(event.key);
    }
  };

  const handleWheel = (event) => {
    if (containerRef.current && containerRef.current.contains(event.target)) {
      event.preventDefault();
    } else if (event.deltaY < 0) {
      handleScroll('ArrowUp');
    } else {
      handleScroll('ArrowDown');
    }
  };

  const handleScroll = async (key) => {
    if (flag === 0) return;
    if (key === 'ArrowUp') {
      if (flag === 1 && recentAllData?.length > 0) {
        index1--;
        if (index1 < -1) index1 = -1;
        if (index1 >= 0) {
          const currentItem = recentAllData[index1];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        } else if (recentHasPrevPage && !recentIsFetching) {
          await recentFetchPrevPage();
          index1 = recentAllData?.length - 1;
          const currentItem = recentAllData[index1];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        }
      } else if (flag === 2 && dateAllData?.length > 0) {
        index2--;
        if (index2 < -1) index2 = -1;
        if (index2 >= 0) {
          const currentItem = dateAllData[index2];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        } else if (dateHasPrevPage && !dateIsFetching) {
          await dateFetchPrevPage();
          index2 = dateAllData?.length - 1;
          const currentItem = dateAllData[index2];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        }
      } else if (flag === 3 && storeAllData?.length > 0) {
        index3--;
        if (index3 < -1) index3 = -1;
        if (index3 >= 0) {
          const currentItem = storeAllData[index3];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        } else if (storeHasPreviousPage && !storeIsFetching) {
          await storeFetchPreviousPage();
          index3 = storeAllData?.length - 1;
          const currentItem = storeAllData[index3];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        }
      } else if (flag === 4 && fetchSskcookAllData?.length > 0) {
        index4--;
        if (index4 < -1) index4 = -1;
        if (index4 >= 0) {
          const currentItem = fetchSskcookAllData[index4];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        } else if (fetchHasPrevPage && !isSskcookFetching) {
          await fetchSskcookPrevPage();
          index4 = fetchSskcookAllData?.length - 1;
          const currentItem = fetchSskcookAllData[index4];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        }
      } else if (flag === 5 && recentSearchAllData?.length > 0) {
        index5--;
        if (index5 < -1) index5 = -1;
        if (index5 >= 0) {
          const currentItem = recentSearchAllData[index5];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        } else if (recentSearchHasPrevPage && !isFetchingRecent) {
          await recentSearchFetchPrev();
          index5 = recentSearchAllData?.length - 1;
          const currentItem = recentSearchAllData[index5];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        }
      } else if (flag === 6 && tagAllData?.length > 0) {
        index6--;
        if (index6 < -1) index6 = -1;
        if (index6 >= 0) {
          const currentItem = tagAllData[index6];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        } else if (tagHasPrevPage && !tagIsFetching) {
          await tagFetchPrevPage();
          index6 = tagAllData?.length - 1;
          const currentItem = tagAllData[index6];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        }
      } else if (flag === 7 && likeSearchAllData?.length > 0) {
        index7--;
        if (index7 < -1) index7 = -1;
        if (index7 >= 0) {
          const currentItem = likeSearchAllData[index7];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        } else if (likeHasPrevPage && !isFetchingLike) {
          await likeFetchPrevPage();
          index7 = likeSearchAllData?.length - 1;
          const currentItem = likeSearchAllData[index7];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        }
      } else if (flag === 8 && fridgeSskcookAllData?.length > 0) {
        index8--;
        if (index8 < -1) index8 = -1;
        if (index8 >= 0) {
          const currentItem = fridgeSskcookAllData[index8];
          if (currentItem) {
            navigate(`/sskcook/${currentItem?.sskcookId}`, {
              state,
            });
          }
        }
      }
    }
    // 맨 아래
    else if (key === 'ArrowDown') {
      let allData, fetchNextPage, hasNextPage, isFetching, index;

      switch (flag) {
        case 1:
          allData = recentAllData;
          fetchNextPage = recentFetchNextPage;
          hasNextPage = recentHasNextPage;
          isFetching = recentIsFetching;
          index = index1;
          break;
        case 2:
          allData = dateAllData;
          fetchNextPage = dateFetchNextPage;
          hasNextPage = dateHasNextPage;
          isFetching = dateIsFetching;
          index = index2;
          break;
        case 3:
          allData = storeAllData;
          fetchNextPage = storeFetchNextPage;
          hasNextPage = storeHasNextPage;
          isFetching = storeIsFetching;
          index = index3;
          break;
        case 4:
          allData = fetchSskcookAllData;
          fetchNextPage = fetchSskcookNextPage;
          hasNextPage = hasSskcookNextPage;
          isFetching = isSskcookFetching;
          index = index4;
          break;
        case 5:
          allData = recentSearchAllData;
          fetchNextPage = fetchNextPageRecent;
          hasNextPage = hasNextPageRecent;
          isFetching = isFetchingRecent;
          index = index5;
          break;
        case 6:
          allData = tagAllData;
          fetchNextPage = tagFetchNextPage;
          hasNextPage = tagHasNextPage;
          isFetching = tagIsFetching;
          index = index6;
          break;
        case 7:
          allData = likeSearchAllData;
          fetchNextPage = fetchNextPageLike;
          hasNextPage = hasNextPageLike;
          isFetching = isFetchingLike;
          index = index7;
          break;
        case 8:
          allData = fridgeSskcookAllData;
          index = index8;
          break;
        default:
          return;
      }

      if (index < allData?.length) {
        index++;

        // 증가된 index 값을 원래 상태에 저장
        switch (flag) {
          case 1:
            index1 = index;
            break;
          case 2:
            index2 = index;
            break;
          case 3:
            index3 = index;
            break;
          case 4:
            index4 = index;
            break;
          case 5:
            index5 = index;
            break;
          case 6:
            index6 = index;
            break;
          case 7:
            index7 = index;
            break;
          case 8:
            index8 = index;
            break;
          default:
            return;
        }

        const currentItem = allData[index];
        if (currentItem) {
          navigate(`/sskcook/${currentItem?.sskcookId}`, {
            state,
          });
        }
      } else if (index >= allData?.length && hasNextPage && !isFetching) {
        const pages = await fetchNextPage();
        const newData =
          pages?.data?.pages[pages?.data?.pages?.length - 1]?.data || [];
        allData = [...allData, ...newData];
        index = allData.length - 1;

        // 새로운 데이터의 인덱스 저장
        switch (flag) {
          case 1:
            index1 = index;
            break;
          case 2:
            index2 = index;
            break;
          case 3:
            index3 = index;
            break;
          case 4:
            index4 = index;
            break;
          case 5:
            index5 = index;
            break;
          case 6:
            index6 = index;
            break;
          case 7:
            index7 = index;
            break;
          default:
            return;
        }
      }
    }
  };
  useEffect(() => {
    const debouncedHandleScroll = debounce(() => handleScroll(null), 400);
    window.addEventListener('scroll', debouncedHandleScroll);
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    flag,
    recentAllData,
    recentFetchNextPage,
    recentHasNextPage,
    recentIsFetching,
    recentHasPrevPage,
    recentFetchPrevPage,
    dateAllData,
    dateFetchNextPage,
    dateHasNextPage,
    dateIsFetching,
    dateHasPrevPage,
    dateFetchPrevPage,
    storeAllData,
    storeFetchNextPage,
    storeHasNextPage,
    storeIsFetching,
    storeHasPreviousPage,
    storeFetchPreviousPage,
    fetchSskcookAllData,
    fetchSskcookNextPage,
    hasSskcookNextPage,
    isSskcookFetching,
    fetchSskcookPrevPage,
    fetchHasPrevPage,
    recentSearchAllData,
    fetchNextPageRecent,
    hasNextPageRecent,
    isFetchingRecent,
    recentSearchHasPrevPage,
    recentSearchFetchPrev,
    tagAllData,
    tagFetchNextPage,
    tagHasNextPage,
    tagIsFetching,
    tagHasPrevPage,
    tagFetchPrevPage,
    likeSearchAllData,
    fetchNextPageLike,
    hasNextPageLike,
    isFetchingLike,
    likeHasPrevPage,
    likeFetchPrevPage,
    fridgeSskcookAllData,
  ]);
  const likeMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await sskcookAPI.LikeAPI(data);
        return response;
      } catch (error) {
        throw new error('Error');
      }
    },
    onSuccess: (response) => {
      if (response.data === 'likes added') {
        message.success('좋아요!', 5);
      } else {
        message.error('좋아요 취소!', 5);
      }
    },
  });

  const reportMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await sskcookAPI.ReportAPI(data);
        return response;
      } catch (error) {
        throw new error('Error');
      }
    },
    onSuccess: (response) => {
      if (response.data === 'report added') {
        message.success('신고 등록!', 5);
      } else {
        message.error('신고 취소!', 5);
      }
    },
  });

  const storeMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await memberAPI.storeAPI(data);
        return response;
      } catch (error) {
        throw new error('Error');
      }
    },
    onSuccess: (response) => {
      if (response.data === 'store added') {
        message.success('보관!', 5);
      } else {
        message.error('보관 취소!', 5);
      }
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: async ({ followingUsername, followerUsername }) => {
      try {
        const response = await memberAPI.subscriptionAPI({
          followingUsername,
          followerUsername,
        });
        return response.data;
      } catch (error) {
        throw new Error('Error');
      }
    },
    onSuccess: (response) => {
      // console.log(response);
      if (response === 1) message.success('구독 성공!', 5);
      else message.error('구독 취소!', 5);
    },
    onError: () => {
      message.error('구독 실패!', 5);
    },
  });

  const checking = () => {
    const lastWord = word[word.length - 1];

    if (lastWord === '멈춰') {
      setIsPlaying(false);
    } else if (lastWord === '실행') {
      setIsPlaying(true);
    } else if (lastWord === '뒤로') {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - 5);
    }
  };

  useEffect(() => {
    if (member.audio) {
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [member.audio]);

  useEffect(() => {
    checking();
  }, [transcript]);

  const { data: sskcookDetailsData, isLoading } = useQuery({
    queryKey: ['sskccokDetails', sskcookId],
    queryFn: () => sskcookAPI.sskcookDetailsAPI(sskcookId),
  });

  useEffect(() => {
    if (!sskcookDetailsData) return;

    const details = sskcookDetailsData.data.details[0];

    const newIsSubscriptionClicked = details.followStatus === 'Following';
    const newIsLikeClicked = details.likeStatus === 'Liked';
    const newIsBookmarkClicked = details.storeStatus === 'Saved';
    const newIsSirenClicked = details.reportStatus === 'Reported';

    setIsSubscriptionClicked((prev) =>
      prev !== newIsSubscriptionClicked ? newIsSubscriptionClicked : prev,
    );
    setIsLikeClicked((prev) =>
      prev !== newIsLikeClicked ? newIsLikeClicked : prev,
    );
    setIsBookmarkClicked((prev) =>
      prev !== newIsBookmarkClicked ? newIsBookmarkClicked : prev,
    );
    setIsSirenClicked((prev) =>
      prev !== newIsSirenClicked ? newIsSirenClicked : prev,
    );
  }, [sskcookDetailsData]);

  const generateRandomPrices = (items) => {
    console.log(items, INGREDIENTS);
    return items.map((item) => {
      if (INGREDIENTS[item.name]) {
        return Number(INGREDIENTS[item.name]);
      } else {
        return getRandomNumber(1000, 20000);
      }
    });
  };
  // 모든 금액
  const [prices, setPrices] = useState([]);

  // 없는 재료 구매
  const [notHaveProducts, setNotHaveProducts] = useState([]);

  // 없는 재료 가격
  const [notHavePrices, setNotHavePrices] = useState([]);

  const [totalPrice, setTotalPrice] = useState('');
  const [discountTotalPrice, setDiscountTotalPrice] = useState('');
  const [selectivePrice, setSelectivePrice] = useState('');
  const [discountSelectivePrice, setDiscountSelectivePrice] = useState('');

  useEffect(() => {
    if (sskcookDetailsData?.data?.ingredients) {
      const newPrice = generateRandomPrices(
        sskcookDetailsData.data.ingredients,
      );
      const leng = newPrice.length;
      setPrices(newPrice);

      const totalSum1 = newPrice.reduce((sum, price) => sum + price, 0);
      setTotalPrice(totalSum1);
      setDiscountTotalPrice(totalSum1 * 0.8);

      const filteredItems = sskcookDetailsData.data.ingredients.filter(
        (item) => !ingredient.some((ing) => item.name.includes(ing.name)),
      );
      setNotHaveProducts(filteredItems.map((item) => item.name));

      const priceMap = filteredItems.reduce((acc, item, index) => {
        acc[item.name] =
          newPrice[
            sskcookDetailsData.data.ingredients.findIndex(
              (ing) => ing.name === item.name,
            )
          ] || 0;
        return acc;
      }, {});

      const leng2 = Object.keys(priceMap).length;
      setNotHavePrices(Object.values(priceMap));
      const startIdx = leng - leng2;
      const partialSum = newPrice
        .slice(startIdx)
        .reduce((sum, price) => sum + price, 0);
      setSelectivePrice(partialSum);
      setDiscountSelectivePrice(partialSum * 0.73);
    }
  }, [sskcookDetailsData, ingredient, location]);

  const handleArrayClick = () => {
    if (sskcookDetailsData && sskcookDetailsData.data.ingredients) {
      const newIngredientNames = sskcookDetailsData.data.ingredients.map(
        (item) => item.name,
      );

      setOrderList(newIngredientNames);
      const encodedOrderList = encodeURIComponent(
        JSON.stringify(newIngredientNames),
      );
      const url = `https://www.cookeat.site/order?orderData=${encodedOrderList}&priceData=${prices}&discount=${20}`;

      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNotHaveClick = () => {
    const encodedOrderList = encodeURIComponent(
      JSON.stringify(notHaveProducts),
    );
    const url = `https://www.cookeat.site/order?orderData=${encodedOrderList}&priceData=${notHavePrices}&discount=${17}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleItemClick = (item) => {
    const itemIndex = sskcookDetailsData?.data?.ingredients.findIndex(
      (ingredient) => ingredient.name === item,
    );
    const priceForItem = prices[itemIndex];

    if (itemIndex !== -1 && priceForItem) {
      const encodedItem = encodeURIComponent(item);
      window.open(
        `https://www.cookeat.site/order?orderData=${encodedItem}&priceData=${priceForItem}`,
        '_blank',
        'noopener,noreferrer',
      );
    } else {
      console.log('error');
    }
  };

  if (isLoading) {
    return (
      <>
        <SwitchContainer>
          <SwitchSkeleton />
        </SwitchContainer>
        <div
          style={{
            width: '60vw',
            height: '78vh',
            marginLeft: '7vw',
            position: 'relative',
            borderRadius: '20px',
          }}
        >
          <StyledSkeleton />
        </div>
      </>
    );
  }

  const accessToken = getCookie('accessToken');

  const onChange = (checked) => {
    setMember((prevState) => ({ ...prevState, audio: checked }));
  };

  const handleCopy = (copyText) => {
    navigator.clipboard
      .writeText(copyText)
      .then(() => message.success('주소 복사 성공!', 5))
      .catch((err) => message.error('주소 복사 실패!', 5));
  };

  const shareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${sskcookDetailsData?.data?.details[0]?.title}`,
        description: `${sskcookDetailsData?.data?.details[0]?.recipe}`,
        imageUrl: 'https://ifh.cc/g/lzPj16.png',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      itemContent: {
        profileText: `${sskcookDetailsData?.data?.details[0]?.nickname}`,
      },
      social: {
        likeCount: Number(sskcookDetailsData?.data?.details[0]?.likeCount),
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleCopy(window.location.href)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5vw' }}>
          <img src={Link} alt="Link Icon" />
          <CustomText
            text={'URL 복사'}
            fontFamily={'Happiness-Sans-Regular'}
            fontSize={'.7vw'}
            color={COLORS.BLACK}
          />
        </div>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => shareKakao()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5vw' }}>
          <img src={KakaoIcon} alt="Kakao Icon" />
          <CustomText
            text={'카카오톡 공유'}
            fontFamily={'Happiness-Sans-Regular'}
            fontSize={'.7vw'}
            color={COLORS.BLACK}
          />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <SwitchContainer>
        <Tooltip
          title={
            <>
              멈춰: 중지
              <br />
              실행: 재생
              <br />
              뒤로: 5초 뒤로 감기
            </>
          }
          color={COLORS.ORANGE}
          key={COLORS.ORANGE}
        >
          <img src={MikeIcon} alt="Mike Icon" />
        </Tooltip>
        <StyledSwitch checked={member.audio} onChange={onChange} />
      </SwitchContainer>
      <DetailsContainer ref={containerRef}>
        <VideoContainer
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ position: 'relative' }}
        >
          <ReactPlayer
            url={sskcookDetailsData?.data?.details[0]?.sskcookUrl}
            width="100%"
            height="100%"
            muted={false}
            controls={false}
            playing={isPlaying}
            loop={true}
            ref={playerRef}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  disablekb: 1,
                  modestbranding: 1,
                  rel: 0,
                  loop: 1,
                },
              },
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              zIndex: 1,
              cursor: 'pointer',
              top: 0,
              left: 0,
            }}
            onClick={() => setIsPlaying(!isPlaying)}
          />
        </VideoContainer>

        {member.nickname !== sskcookDetailsData?.data.details[0]?.nickname && (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              left: '53vw',
              top: '25vh',
            }}
            onClick={() => {
              if (accessToken) {
                setIsSirenClicked(!isSirenClicked);
                reportMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img
              src={isSirenClicked ? ClickedSiren : Siren}
              alt={isSirenClicked ? 'ClickedSiren Icon' : 'Siren Icon'}
            />
          </div>
        )}

        {isLikeClicked ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              bottom: '15vh',
              left: '53vw',
            }}
            onClick={() => {
              if (accessToken) {
                setIsLikeClicked(!isLikeClicked);
                likeMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={ClickedLike} alt="ClickedLike Icon" />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              bottom: '15vh',
              left: '53vw',
            }}
            onClick={() => {
              if (accessToken) {
                setIsLikeClicked(!isLikeClicked);
                likeMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={Like} alt="Like Icon" />
          </div>
        )}
        <div>
          <Dropdown
            overlay={menu}
            open={isShareClicked}
            onOpenChange={(flag) => setIsShareClicked(flag)}
            trigger={['click']}
          >
            <div
              style={{
                position: 'absolute',
                zIndex: '1',
                cursor: 'pointer',
                bottom: '9vh',
                left: '53vw',
              }}
            >
              <img
                src={isShareClicked ? ClickedShare : Share}
                alt={isShareClicked ? 'ClickedShare Icon' : 'Share Icon'}
              />
            </div>
          </Dropdown>
        </div>
        {isBookmarkClicked ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              bottom: '3vh',
              left: '53vw',
            }}
            onClick={() => {
              if (accessToken) {
                setIsBookmarkClicked(!isBookmarkClicked);
                storeMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={ClickedBookmark} alt="ClickedBookmark Icon" />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              bottom: '3vh',
              left: '53vw',
            }}
            onClick={() => {
              if (accessToken) {
                setIsBookmarkClicked(!isBookmarkClicked);
                storeMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={Bookmark} alt="Bookmark Icon" />
          </div>
        )}
        {isPlaying ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              top: '25vh',
              left: '30vw',
            }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <img src={Pause} alt="Pause Icon" />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              top: '25vh',
              left: '30vw',
            }}
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
          >
            <img src={Play} alt="Play Icon" />
          </div>
        )}
        <SubscriptionContainer>
          <IngredientSection>
            <CustomImageButton
              src={sskcookDetailsData?.data?.details[0]?.profileImage}
              width={'3vw'}
              height={'3vw'}
              onClick={() =>
                handleChangeUrl(
                  `/subscription/${sskcookDetailsData?.data?.details[0]?.username}`,
                )
              }
            />
          </IngredientSection>
          <IngredientSection>
            <CustomText
              text={sskcookDetailsData?.data?.details[0]?.nickname}
              fontFamily={'Happiness-Sans-Regular'}
              fontSize={'.8vw'}
              color={COLORS.WHITE}
            />
          </IngredientSection>
          <IngredientSection>
            {member.nickname !==
            sskcookDetailsData?.data?.details[0]?.nickname ? (
              <CustomButton
                text={isSubscriptionClicked ? '구독중' : '구독'}
                color={isSubscriptionClicked ? COLORS.BLACK : COLORS.WHITE}
                backgroundColor={
                  isSubscriptionClicked ? COLORS.WHITE : COLORS.BLACK
                }
                borderColor={
                  isSubscriptionClicked ? COLORS.BLACK : COLORS.WHITE
                }
                fontFamily={'Happiness-Sans-Bold'}
                borderRadius={'100px'}
                width={'4vw'}
                height={'4vh'}
                fontSize={'.8vw'}
                onClick={() => {
                  if (accessToken) {
                    setIsSubscriptionClicked(!isSubscriptionClicked);
                    subscriptionMutation.mutate({
                      followingUsername:
                        sskcookDetailsData?.data?.details[0]?.username,
                      followerUsername: member.username,
                    });
                  } else {
                    message.warning('로그인이 필요한 서비스예요!', 5);
                  }
                }}
              />
            ) : null}
          </IngredientSection>
        </SubscriptionContainer>
        <WriteContainer>
          <CustomText
            text={sskcookDetailsData?.data?.details[0]?.title}
            color={COLORS.BLACK}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1.5vw'}
          />
          <TagContainer>
            {sskcookDetailsData?.data?.tags?.length > 0
              ? sskcookDetailsData?.data?.tags.map((item, index) => (
                  <TagInner key={index}>
                    <CustomText
                      text={'#'}
                      fontFamily={'Happiness-Sans-Regular'}
                      color={COLORS.BLACK}
                      fontSize={'1vw'}
                    />
                    <CustomText
                      text={item}
                      fontFamily={'Happiness-Sans-Regular'}
                      color={COLORS.BLACK}
                      fontSize={'1vw'}
                    />
                  </TagInner>
                ))
              : null}
          </TagContainer>
          <IngredientContainer>
            <div
              style={{ display: 'flex', alignItems: 'flex-end', gap: '2vw' }}
            >
              <CustomText
                text={'준비 재료'}
                color={COLORS.BLACK}
                fontFamily={'Happiness-Sans-Bold'}
                fontSize={'1.3vw'}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      marginRight: '.3vw',
                      gap: '.3vw',
                      marginBottom: '1vh',
                    }}
                  >
                    <CustomText
                      text={`${totalPrice}원`}
                      fontFamily={'Happiness-Sans-Bold'}
                      fontSize={'.7vw'}
                      color={COLORS.TAG}
                      style={{
                        textDecoration: 'line-through',
                        textAlign: 'center',
                        display: 'block',
                      }}
                    />
                    <CustomText
                      text={`${discountTotalPrice}원`}
                      fontFamily={'Happiness-Sans-Bold'}
                      fontSize={'.9vw'}
                      color={COLORS.BLACK}
                    />
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '-1vh',
                    }}
                  >
                    <img src={SalesIcon} alt="Sales Icon" />
                    <div
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CustomText
                        text={'20'}
                        fontFamily={'Happiness-Sans-Bold'}
                        color={COLORS.SALES}
                        fontSize={'.9vw'}
                      />
                      <CustomText
                        text={'%'}
                        fontFamily={'Happiness-Sans-Bold'}
                        color={COLORS.SALES}
                        fontSize={'.9vw'}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CustomButton
                    text={'모든 재료 한번에 구매'}
                    color={COLORS.WHITE}
                    backgroundColor={COLORS.ORANGE}
                    borderColor={COLORS.ORANGE}
                    fontFamily={'Happiness-Sans-Bold'}
                    width={'8vw'}
                    height={'4vh'}
                    fontSize={'.7vw'}
                    borderRadius={'100px'}
                    onClick={handleArrayClick}
                    style={{ position: 'relative' }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        marginRight: '.3vw',
                        marginBottom: '1vh',
                        gap: '.3vw',
                      }}
                    >
                      <CustomText
                        text={`${selectivePrice}원`}
                        fontFamily={'Happiness-Sans-Bold'}
                        fontSize={'.7vw'}
                        color={COLORS.TAG}
                        style={{
                          textDecoration: 'line-through',
                          textAlign: 'center',
                          display: 'block',
                        }}
                      />
                      <CustomText
                        text={`${discountSelectivePrice}원`}
                        fontFamily={'Happiness-Sans-Bold'}
                        fontSize={'.9vw'}
                        color={COLORS.BLACK}
                      />
                    </div>
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '-1vh',
                      }}
                    >
                      <img src={SalesNavyIcon} alt="Sales Icon" />
                      <div
                        style={{
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CustomText
                          text={'17'}
                          fontFamily={'Happiness-Sans-Bold'}
                          color={COLORS.SALES}
                          fontSize={'.9vw'}
                        />
                        <CustomText
                          text={'%'}
                          fontFamily={'Happiness-Sans-Bold'}
                          color={COLORS.SALES}
                          fontSize={'.9vw'}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CustomButton
                      text={'없는 재료 한번에 구매'}
                      color={COLORS.WHITE}
                      backgroundColor={COLORS.LIGHTBLUE}
                      borderColor={COLORS.LIGHTBLUE}
                      fontFamily={'Happiness-Sans-Bold'}
                      width={'8vw'}
                      height={'4vh'}
                      fontSize={'.7vw'}
                      borderRadius={'100px'}
                      onClick={handleNotHaveClick}
                      style={{ position: 'relative' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <IngredientInner>
              <>
                {(getCookie('accessToken')
                  ? [
                      ...sskcookDetailsData?.data?.ingredients.filter((item) =>
                        ingredient.some((ing) => item.name.includes(ing.name)),
                      ),
                      ...sskcookDetailsData?.data?.ingredients.filter(
                        (item) =>
                          !ingredient.some((ing) =>
                            item.name.includes(ing.name),
                          ),
                      ),
                    ]
                  : sskcookDetailsData?.data?.ingredients
                ) // 로그인하지 않았을 때 모든 재료를 보여줌
                  .map((item, index) => (
                    <IngredientWrapper key={index}>
                      <IngredientSection>
                        <CustomText
                          text={item.name}
                          fontFamily={'Happiness-Sans-Regular'}
                          color={
                            getCookie('accessToken') &&
                            ingredient.some((ing) =>
                              item.name.includes(ing.name),
                            )
                              ? COLORS.ORANGE
                              : COLORS.BLACK
                          }
                          fontSize={'1vw'}
                        />
                      </IngredientSection>
                      <IngredientSection>
                        <CustomText
                          text={item.amount}
                          fontFamily={'Happiness-Sans-Regular'}
                          color={COLORS.BLACK}
                          fontSize={'1vw'}
                          style={{ textDecoration: 'underline' }}
                        />
                      </IngredientSection>
                      <IngredientSection>
                        <CustomText
                          text={
                            INGREDIENTS[item.name]
                              ? `${INGREDIENTS[item.name]}원`
                              : `${(prices[index] || '').toString()}원`
                          }
                          fontFamily={'Happiness-Sans-Regular'}
                          color={COLORS.BLACK}
                          fontSize={'1vw'}
                        />
                      </IngredientSection>
                      <IngredientSection>
                        <CustomButton
                          text={'구매'}
                          fontSize={'.7vw'}
                          borderRadius={'100px'}
                          color={COLORS.BLACK}
                          backgroundColor={COLORS.WHITE}
                          borderColor={COLORS.BLACK}
                          width={'3vw'}
                          height={'3vh'}
                          fontFamily={'Happiness-Sans-Bold'}
                          onClick={() => handleItemClick(item.name)}
                        />
                      </IngredientSection>
                    </IngredientWrapper>
                  ))}
              </>
            </IngredientInner>

            <LineContainer />
          </IngredientContainer>
          <RecipeContainer>
            <CustomText
              text={'레시피'}
              color={COLORS.BLACK}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1.3vw'}
            />

            <IngredientContainer>
              <RecipeInner>
                <CustomText
                  text={sskcookDetailsData?.data?.details[0]?.recipe}
                  color={COLORS.BLACK}
                  fontFamily={'Happiness-Sans-Regular'}
                />
              </RecipeInner>
            </IngredientContainer>
          </RecipeContainer>
        </WriteContainer>
      </DetailsContainer>
    </>
  );
};

export default SskcookDetails;
