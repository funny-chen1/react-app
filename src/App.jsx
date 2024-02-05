import { useState, useEffect, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from './components/Header/Header'
import './App.css'
import routes from './router/index';
import Cookies from 'js-cookie';
import SearchView from './views/SearchView'
import { checkLogin } from './utils/service';

function App() {
  const [count, setCount] = useState(0);

  const init = async() => {
    const cookie = Cookies.get('cookie_data') || '';
    console.log(cookie)
    if (cookie !== '') {
        const res = await checkLogin({cookie: cookie});
        console.log(res);
        dispatch(setUser(res.data));
    }
  }

  useEffect(() => {
    init();
  }, [])

  return (
      <>
          <Header></Header>
          <div>
              <Suspense>
                  <Routes>
                      {
                          routes.map(route => {
                              return <Route key={route.path} path={route.path} Component={route.element}/>
                          })
                      }
                      <Route path={'/search'} element={<SearchView/>}/>
                  </Routes>
              </Suspense>
          </div>

      </>
  )
}

export default App;
