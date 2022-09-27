import React, { useState } from "react";
import Compose from "./Compose";
import SentBox from "./SentBox";
import classes from "./Welcome.module.css";
import Inbox from "./Inbox";

const Welcome = () => {
  const [composeMailOpen, setComposeMailOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [sentboxOpen, setSentboxOpen] = useState(false);
  const [count, setCount] = useState(0);

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
    <h1 style={{fontFamily:"sans-serif", marginLeft:"20px"}}>Welcome to mail box</h1>
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
