import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SingleMail = (props) => {
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
  const endpoint = props.data.ID;

  useEffect(() => {
    fetch(
      `https://mail-box-95895-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox/${endpoint}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isRead: true,
        }).then((res) => {
          return res.json();
        })
      }
    );
  }, [cleanUserEmail]);

  return (
    <div>
      <button>Close</button>
      <h3>{props.data.email.from}</h3>
      <hr />
      <h3>{props.data.email.heading}</h3>
      <hr />
      {/* <h3>{props.data.email.heading}</h3> */}
      {/* <div dangerouslySetInnerHTML={{ _html: props.email.body }} /> */}
    </div>
  );
};

export default SingleMail;
