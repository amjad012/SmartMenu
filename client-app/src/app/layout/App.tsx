import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import React from "react";

function App() {

  const location = useLocation();

  return (

    <>
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}

    </>
  );
}

export default observer(App);
