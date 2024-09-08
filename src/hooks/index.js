import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { memberState } from '../store';
import { useMutation } from '@tanstack/react-query';
import { memberAPI } from '../apis/member';
import { debounce } from 'lodash';

// url 이동
export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const handleChangeUrl = (url) => {
    navigate(url);
  };

  return {
    handleChangeUrl,
  };
};

// 스크롤 맨 위로 이동
export const useScrollUp = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// 쿠키 설정
export const setCookie = (accessToken) => {
  try {
    document.cookie = `accessToken=${accessToken};path=/;max-age=300000`;
  } catch (e) {
    console.error(e);
  }
};

// 쿠키 값 가져오기
export function getCookie(name) {
  const cookieString = document.cookie;
  if (cookieString.length > 0) {
    const cookies = cookieString.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const separatorIndex = cookie.indexOf('=');
      const cookieName = cookie.substring(0, separatorIndex);
      if (cookieName === name) {
        return decodeURIComponent(cookie.substring(separatorIndex + 1));
      }
    }
  }
  return undefined;
}

// 쿠키 삭제
export const deleteAllCookies = () => {
  try {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  } catch (e) {
    console.error(e);
  }
};

// 로그아웃
export const useLogout = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const resetMemberState = useResetRecoilState(memberState);
  const mutation = useMutation({
    mutationFn: async () => {
      await memberAPI.logoutAPI();
    },
    onSuccess: () => {
      resetMemberState();
      deleteAllCookies();
      handleChangeUrl('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const debouncedLogout = useCallback(
    debounce(() => {
      mutation.mutate();
    }, 300),
    [],
  );

  return debouncedLogout;
};
