import './styles/reset.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CommonLayout from './pages/Layout';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Live from './pages/Live';
import { getCookie } from './hooks';
import AuthLayout from './pages/Layout/Auth';
function App() {
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
        ></Route>
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
        ></Route>

        <Route
          path={'/'}
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <Home />
            </CommonLayout>
          }
        ></Route>
        <Route
          path={'/live'}
          element={
            <CommonLayout isLogined={!!getCookie('accessToken')}>
              <Live />
            </CommonLayout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
