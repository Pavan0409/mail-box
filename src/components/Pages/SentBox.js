import React, { Fragment, useEffect, useState } from "react";
import SingleMail from "./SingleMail";

const SentBox = () => {
  const [emails, setEmails] = useState({});
  const [singleMail, setSingleMail] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(
      `https://mail-box-95895-default-rtdb.firebaseio.com/sentemails.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "appliction/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
      });
  }, [show]);

  useEffect(() => {
    let arr = [];
    for (let key in emails) {
      if (emails[key].isRead === true) {
        arr.push(emails[key].isRead);
      }
    }
  }, [emails, show]);

  const openEmailClickHandler = (event) => {
    setSingleMail({
      email: emails[event.currentTarget.id],
      ID: event.currentTarget.id,
    });
  };

  const emailList = emails ? (
    <ul style={{ marginTop: "20px" }}>
      {Object.keys(emails).map((item) => {
        console.log(emails[item].isRead);

        return (
          <li
            id={item}
            onClick={openEmailClickHandler}
            style={{
              border: "3px solid black",
              textAlign: "left",
              marginTop: "10px",
              borderRadius: "8px",
              height: "50px",
              overflow: "hidden",
            }}
            key={item}
          >
            <div
              style={{
                backgroundColor: emails
                  ? emails[item]
                    ? emails[item].isRead
                      ? "blue"
                      : "white"
                    : ""
                  : "",
                height: "10px",
                width: "10px",
                marginTop: "7px",
                border: "1px solid black",
              }}
            ></div>
            <div
              style={{
                paddingRight: "10px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                From:
              </span>
              <span>{emails[item].to}</span>
            </div>
            <br />
            <div>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Subject:
              </span>
              <span> {emails[item].heading}</span>
            </div>
            <br />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "1000px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Msg:
                  </span>
                  <span style={{}}>
                    {" "}
                    {emails[item].body.replace(/<[^>]*>/g, "")}
                  </span>
                </div>
              </div>
            </div>
            <br />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>
      No Emails Found
      <button onClick={() => onSingleMailBackHandler()}>Back</button>
    </p>
  );

  const onSingleMailBackHandler = () => {
    setShow(true);
    setSingleMail("");
  };

  const onSingleMailDeleteHandler = (data) => {
    setEmails(data);
    setSingleMail("");
  };

  return (
    <Fragment>
      {!singleMail && emailList}
      {singleMail && (
        <>
          <SingleMail
            onClose={onSingleMailBackHandler}
            onDelete={onSingleMailDeleteHandler}
            data={singleMail}
            setShow={setShow}
          />
        </>
      )}
    </Fragment>
  );
};

export default SentBox;
