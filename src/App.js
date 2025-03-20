import React, { useEffect, useState } from "react";
import publicRoutes from "./router/routes/publicRoutes";
import Router from "./router/Router";
import { getRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";
function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  },[]);
  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, []);
  return <Router allRoutes={allRoutes} />;
}

export default App;
