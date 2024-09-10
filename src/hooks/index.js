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

// 스크롤 가운데로 이동
export const useScrollMiddle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight / 2 - window.innerHeight / 2,
      behavior: 'smooth',
    });
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
