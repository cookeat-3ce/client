import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../hooks';

const SignUp = () => {
  const navigate = useNavigate();
  const accessToken = getCookie('accessToken');
  useEffect(() => {
    if (accessToken) {
      navigate('/', { replace: true });
    }
  }, [accessToken, navigate]);
  return <div>SignUp</div>;
};

export default SignUp;
