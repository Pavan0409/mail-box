import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleMail from "./SingleMail";
import { mailActions } from "../Store/mailreducer";

const Inbox = () => {
    const dispatch = useDispatch();
  const [isRead, setIsRead] = useState(false);
  const [emails, setEmails] = useState({});
  const [ singleMail, setSingleMail] = useState("");
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(`https://mail-box-95895-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails.json`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json())
    .then((data)=>{
        setEmails(data);
        dispatch(mailActions.setInbox(data))
    })
  },[cleanUserEmail]);

  const openEmailClickHandler = (event) => {
    setSingleMail({email:emails[event.currentTarget.id],ID: event.currentTarget.id});
    setIsRead(true);
  }

  const emailList = emails ? (
    <ul>
        {Object.keys(emails).map((item)=>(
            <li id={item} onClick={openEmailClickHandler} style={{border:"2px solid black", textAlign:"left",listStyle:emails[item].isRead?'none':'',}} key={item}>
            <span style={{ paddingRight: "10px", textAlign: "left" }}>
            From: {emails[item].from}
          </span>
          <span>Heading: {emails[item].heading}</span>
          {/* <p dangerouslySetInnerHTML={{ __html: emails[item].body }}></p> */}
            </li>
        ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  )

  const onSingleMailCloseHandler = () => {
    setSingleMail('');
  }

  const onSingleMailDeleteHandler = (data) => {
    setEmails(data);
  }

  return (
    <Fragment>
        <h3>This is Inbox</h3>
        {!singleMail && emailList}
        {singleMail && <SingleMail onClose={onSingleMailCloseHandler} data={singleMail} />}
        {singleMail && <SingleMail onDelete={onSingleMailDeleteHandler} onClose={onSingleMailCloseHandler} data={singleMail} />}
    </Fragment>
  )
};

export default Inbox;
