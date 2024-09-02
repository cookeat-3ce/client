import { useEffect } from 'react';
import './styles/reset.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import CommonLayout from './pages/Layout';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Live from './pages/Live';
import SskcookMonthly from './pages/SskcookMonthly';
import SskcookRecent from './pages/SskcookRecent';
import Admin from './pages/Admin';
import SskcookDetails from './pages/SskcookDetails';
import Tag from './pages/Tag';
import SskcookUpload from './pages/SskcookUpload';
import Stored from './pages/Stored';
import Search from './pages/Search';
import Info from './pages/Info';
import { getCookie } from './hooks';
import { memberState } from './store';
import { useRecoilValue } from 'recoil';
import AuthLayout from './pages/Layout/Auth';
import CreateLive from './pages/CreateLive';
import Subscription from './pages/Subscription';
import SubscriptionInfo from './pages/SubscriptionInfo';
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

const Sskcook = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const date = searchParams.get('date');
  const sort = searchParams.get('sort');

  return (
    <CommonLayout isLogined={!!getCookie('accessToken')}>
      {tag && <Tag />}
      {date && <SskcookMonthly />}
      {sort && <SskcookRecent />}
    </CommonLayout>
  );
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

        <Route path="/sskcook" element={<Sskcook />} />
        {/* 위에건 쿼리 파라미터 라우팅 */}
        {/* ex) http://localhost:3000/sskccok?tag=한식&page=1*/}
        <Route
          path="/stored"
          element={
            getCookie('accessToken') && role === 'ROLE_USER' ? (
              <CommonLayout isLogined={!!getCookie('accessToken')}>
                <Stored />
              </CommonLayout>
            ) : (
              <Navigate to={'/login'} replace />
            )
          }
        />
        <Route
          path="/sskcook/:sskcookId"
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <SskcookDetails />
            </CommonLayout>
          }
        />

        <Route
          path={'/info/upload'}
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <QueryClientProvider client={queryClient}>
                <SskcookUpload />
              </QueryClientProvider>
            </CommonLayout>
          }
        />

        <Route
          path="/search"
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <Search />
            </CommonLayout>
          }
        />
        <Route
          path="/live"
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <Live />
            </CommonLayout>
          }
        />
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
        <Route
          path={'/info'}
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <Info />
            </CommonLayout>
          }
        />
        <Route
          path="/live/create"
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <CreateLive></CreateLive>
            </CommonLayout>
          }
        />
        <Route
          path="/subscription"
          element={
            getCookie('accessToken') && role === 'ROLE_USER' ? (
              <CommonLayout isLogined={!!getCookie('accessToken')}>
                <Subscription />
              </CommonLayout>
            ) : (
              <Navigate to={'/login'} replace />
            )
          }
        />
        <Route
          path="/subscription/:username"
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <SubscriptionInfo />
            </CommonLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
