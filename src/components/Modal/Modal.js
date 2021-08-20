import React, { useRef, useEffect } from "react";
import "./Modal.css";
import { useTransition, animated } from "react-spring";
const Modal = (props) => {
  const modalRef = useRef();
  //When clicked outside the modal, close the modal
  useEffect(() => {
    let handler = document.addEventListener("mousedown", (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setModal(false);
      }
    });
    return document.removeEventListener("mousedown", handler);
  });

  //Defining transition for modal's appearance
  const transition = useTransition(props.show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 500 },
  });
  return (
    <div className="modal-background">
      {transition((style, item) =>
        item ? (
          <animated.div
            className="modal-container"
            ref={modalRef}
            style={style}
          >
            <div className="modal-photo">
              <img src="https://i.pinimg.com/originals/fc/5f/85/fc5f85e81ad86d6fc462a8fac35da226.jpg" alt="modal" />
            </div>
            <div className="modal-right">
              <h1>Start listening with a free Spotify account</h1>
              <button className="sign-up">SIGN UP FREE</button>
              <button className="download">DOWNLOAD APP</button>
              <div className="have-account">
                <h2>Already have an account?</h2>
                <h1>LOG IN</h1>
              </div>
            </div>
          </animated.div>
        ) : (
          ""
        )
      )}
      <h1
        className="close"
        onClick={() => {
          props.setModal(false);
        }}
      >
        Close
      </h1>
    </div>
  );
};

export default Modal;
