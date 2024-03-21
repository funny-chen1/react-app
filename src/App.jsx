import { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.css";
import routes from "./router/index";
import Cookies from "js-cookie";
import SearchView from "./views/SearchView";
import { checkLogin } from "./utils/service";
import { getLocal } from "./utils/public";
import { setUser } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [state, setState] = useState({
    isLogin: false,
  });
  const dispatch = useDispatch();

  const init = async () => {
    var cookie = getLocal("cookie");
    if (cookie) {
      setState({ ...state, isLogin: true });
      const res = await checkLogin({ cookie: cookie });
      if (res.data) {
        dispatch(setUser(res.data));
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Header></Header>
      <div>
        <Suspense>
          <Routes>
            {routes.map((route) => {
              if (state.isLogin) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    Component={route.element}
                  />
                );
              } else {
                return route.isAuth ? (
                  <Route key="*" path="*" element={<Navigate to="/" />} />
                ) : (
                  <Route
                    key={route.path}
                    path={route.path}
                    Component={route.element}
                  />
                );
              }
            })}
            <Route path={"/search"} element={<SearchView />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
