import './styles/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommonLayout from './pages/Layout';
import Home from './pages/Home';
import Live from './pages/Live';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <CommonLayout>
              <Home />
            </CommonLayout>
          }
        ></Route>
        <Route
          path={'/live'}
          element={
            <CommonLayout>
              <Live />
            </CommonLayout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
