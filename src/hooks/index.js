import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
