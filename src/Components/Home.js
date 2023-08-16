import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import ComposeMail from "./ComposeMail";
import Inbox from "./inbox";

const Home = () => {
  const showComposeMail = useSelector((state) => state.ui.composeMailVisible);
  const showInbox = useSelector((state) => state.ui.inboxVisible);
  return (
    <Fragment>
      <Header />
      <div style={{ display: "flex" }}>
        <SideBar />
        {showComposeMail && <ComposeMail />}
        {showInbox && <Inbox />}
      </div>
    </Fragment>
  );
};

export default Home;
