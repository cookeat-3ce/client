import './styles/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommonLayout from './pages/Layout';
import Home from './pages/Home';
import Live from './pages/Live';
import { getCookie } from './hooks';
function App() {
  console.log(getCookie('accessToken'));
  return (
    <BrowserRouter>
      <Routes>
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
