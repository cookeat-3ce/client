import { useEffect } from 'react';
import './styles/reset.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import CommonLayout from './pages/Layout';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Live from './pages/Live';
import Admin from './pages/Admin';
import Tag from './pages/Tag';
import Sskcook from './pages/Sskcook';
import { getCookie } from './hooks';
import { memberState } from './store';
import { useRecoilValue } from 'recoil';
import AuthLayout from './pages/Layout/Auth';

const queryClient = new QueryClient();

// Component that handles redirecting admins
const AdminRedirector = ({ role }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'ROLE_ADMIN' && getCookie('accessToken')) {
      navigate('/admin');
    }
  }, [role, navigate]);

  return null;
};

function App() {
  const persist = useRecoilValue(memberState);
  const role = persist.authValue;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/*'}
          element={
            <AuthLayout>
              <Error />
            </AuthLayout>
          }
        />
        <Route
          path={'/login'}
          element={
            getCookie('accessToken') ? (
              <Navigate to="/" replace />
            ) : (
              <AuthLayout>
                <Login />
              </AuthLayout>
            )
          }
        />
        <Route
          path={'/signup'}
          element={
            getCookie('accessToken') ? (
              <Navigate to="/" replace />
            ) : (
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            )
          }
        />

        <Route
          path="/"
          element={
            role === 'ROLE_ADMIN' && getCookie('accessToken') ? (
              <>
                <AdminRedirector role={role} />
                <Admin />
              </>
            ) : (
              <CommonLayout isLogined={!!getCookie('accessToken')}>
                <Home />
              </CommonLayout>
            )
          }
        />

        <Route
          path={'/live'}
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <Live />
            </CommonLayout>
          }
        />

        <Route
          path={'/sskcook/upload'}
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
            <QueryClientProvider client={queryClient}>
              <Sskcook />
            </QueryClientProvider>
            </CommonLayout>
          }
        />

        <Route
          path="/sskccok/"
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <Tag />
            </CommonLayout>
          }
        />
        {/* 위에건 쿼리 파라미터 라우팅 */}
        {/* ex) http://localhost:3000/sskccok?tag=한식&page=1*/}

        <Route
          path={'/admin'}
          element={
            getCookie('accessToken') && role === 'ROLE_ADMIN' ? (
              <>
                <AdminRedirector role={role} />
                <Admin />
              </>
            ) : (
              <CommonLayout isLogined={!!getCookie('accessToken')}>
                <Home />
              </CommonLayout>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
