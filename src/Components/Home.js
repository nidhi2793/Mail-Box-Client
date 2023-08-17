import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import ComposeMail from "./ComposeMail";
import Inbox from "./inbox";
import SentBox from "./sentbox";
import "./Home.css";

const Home = () => {
  const showComposeMail = useSelector((state) => state.ui.composeMailVisible);
  const showInbox = useSelector((state) => state.ui.inboxVisible);
  const showSentbox = useSelector((state) => state.ui.sentboxVisible);
  return (
    <Fragment>
      <Header />
      <div className="body">
        <SideBar />
        {showInbox && <Inbox />}
        {showComposeMail && <ComposeMail />}
        {showSentbox && <SentBox />}
      </div>
    </Fragment>
  );
};

export default Home;
