import Layout from './Pages/Layout/ForOthers/index';
import SFormLayout from './Pages/Layout/ForLoginAndSignup/index'
import SignUpPage from "./Pages/SignUpPage/index";
import SignInPage from "./Pages/SignInPage/index";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import HomePage from "./Pages/Home/index";
import News from './Pages/News/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewsDescription from './Pages/NewsDescription/index';

function App() {
  return (
    <>

      <Routes>
        <Route element={<SFormLayout />}>
          <Route path="/login" element={<SignInPage />}></Route>
          <Route path="/register" element={<SignUpPage />}></Route>
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path='/news' element={<News />}></Route>
          <Route path='/news-description' element={<NewsDescription />}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
