import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SentBox = () => {
  const [emails, setEmails] = useState({});
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mail-box-95895-default-rtdb.firebaseio.com/${cleanUserEmail}sentemails.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
      });
  }, [cleanUserEmail]);

  const emailList = emails ? (
    <ul>
      {Object.keys(emails).map((item) => (
        <p style={{ border: "2px solid black", textAlign: "left" }} key={item}>
          <label style={{ textAlign: "left" }}>To: {emails[item].to}</label>
          <hr />
          <label>Heading: {emails[item].heading}</label>
          <hr />
          {/* <p dangerouslySetInnerHTML={{ _html: emails[item].body }}></p> */}
        </p>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  return (
    <div>
      <h4>This is outbox</h4>
      {emailList}
    </div>
  );
};

export default SentBox;
