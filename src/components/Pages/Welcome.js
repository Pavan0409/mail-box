import React, { useState } from "react";
import Compose from "./Compose";
import SentBox from "./SentBox";
import classes from "./Welcome.module.css";

const Welcome = () => {
  const [composeMailOpen, setComposeMailOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [sentboxOpen, setSentboxOpen] = useState(false);

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
      <h3>Welcome To Mail-box</h3>
      <div className={classes.sidenav}>
        <button onClick={composeMailClickHandler}>Compose Email</button>
        <br />
        <button onClick={inboxClickHandler}>Inbox</button>
        <br />
        <button onClick={sentboxClickHandler}>Outbox</button>
      </div>
      <div className={classes.mailBox}>
        {composeMailOpen && <Compose />}
        {inboxOpen && <div> This is Inbox</div>}
        {sentboxOpen && <SentBox />}
      </div>
    </div>
  );
};

export default Welcome;
