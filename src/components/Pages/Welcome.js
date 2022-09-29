import React, { useState } from "react";
import Compose from "./Compose";
import SentBox from "./SentBox";
import classes from "./Welcome.module.css";
import Inbox from "./Inbox";
import { useNavigate } from "react-router-dom";
import { authActions } from "../Store/AuthReducer";
import { useDispatch } from "react-redux";

const Welcome = () => {
  const [composeMailOpen, setComposeMailOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [sentboxOpen, setSentboxOpen] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const logoutHandler = () => {
    localStorage.removeItem("idToken");
    dispatch(authActions.logout());
    navigate("/login");
  }

  const composeMailClickHandler = () => {
    setInboxOpen(false);
    setSentboxOpen(false);
    setComposeMailOpen(true);
  };
  const inboxClickHandler = () => {
    setSentboxOpen(false);
    setComposeMailOpen(false);
    setInboxOpen(true);
  };
  const sentboxClickHandler = () => {
    setComposeMailOpen(false);
    setInboxOpen(false);
    setSentboxOpen(true);
  };
  return (
    <div>
    <h1>Welcome to mail box</h1>
     <button onClick={logoutHandler}>Log Out</button>
      <div className={classes.sidenav}>
        <button onClick={composeMailClickHandler}>Compose Email</button>
        <br />
        <button onClick={inboxClickHandler}>Inbox<span>Unread:{count}</span></button>
        <br />
        <button onClick={sentboxClickHandler}>Outbox</button>
      </div>
      <div className={classes.mailBox}>
        {composeMailOpen && <Compose />}
        {inboxOpen && <Inbox setIsCount={setCount} />}
        {sentboxOpen && <SentBox />}
      </div>
    </div>
  );
};

export default Welcome;
