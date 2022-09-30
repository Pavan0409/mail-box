import React, { useRef, useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useSelector } from "react-redux";
import "./Compose.css";

const Compose = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const toEmailRef = useRef();
  const emailHeadingRef = useRef();
  const userEmail = useSelector((state) => state.auth.email);
  const CleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  const onEditorChange = (currEditorState) => {
    setEditorState(currEditorState);
  };

  const sendMailHandler = () => {
    const emailData = {
      from: userEmail,
      to: toEmailRef.current.value,
      heading: emailHeadingRef.current.value,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      isRead: true,
    };
    fetch(
      `https://mail-box-95895-default-rtdb.firebaseio.com/${CleanUserEmail}sentemails.json`,
      {
        method: "POST",
        body: JSON.stringify(emailData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      return res.json();
    });

    toEmailRef.current.value = "";
    emailHeadingRef.current.value = "";
    setEditorState(EditorState.createEmpty());
    setTimeout(() => {
      window.location.reload();
    },1000);
  };

  return (
    <div>
      <label>To</label>
      <input type="email" required ref={toEmailRef} />
      <br />
      <label>Subject</label>
      <input type="text" ref={emailHeadingRef} />
      <div
        style={{
          overflow: "scroll",
          backgroundColor: "#abbeb",
          height: "40vw",
        }}
      >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorChange}
        />
      </div>
      <button onClick={sendMailHandler}>Send</button>
    </div>
  );
};

export default Compose;
