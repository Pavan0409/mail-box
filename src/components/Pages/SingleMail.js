import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SingleMail = (props) => {
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
  const endpoint = props.data.ID;

  useEffect(() => {
    const body1 = props.data.email.body.replace(/<[^>]*>/g, "");
    fetch(
      `https://mail-box-95895-default-rtdb.firebaseio.com/sentemails/${endpoint}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: props.data.email.from,
          to: props.data.email.to,
          heading: props.data.email.heading,
          body: body1,
          isRead: false,
          id: props.data.email.id,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // return props.setBlue(props.data.email.id);
      });
  }, []);

  const msg = props.data.email.body.replace(/<[^>]*>/g, "");

  return (
    <div>
      <button style={{ aligntext: "right" }} onClick={props.onClose}>
        Back
      </button>
      <div>
        <span>From</span>
        <span>
          <b>{props.data.email.to}</b>
        </span>
      </div>
      <hr />
      <span>Subject: </span>
      <span>
        <b>{props.data.email.heading}</b>
      </span>
      <hr />
      <p> {msg}</p>
    </div>
  );
};

export default SingleMail;
