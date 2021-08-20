import React from "react";
import { useTransition, animated } from "react-spring";
const SidebarPrompt = (props) => {
  //Defining transition for the appearing prompt
  const transition = useTransition(props.show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 30 },
  });

  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.div style={style} className={`sidebar-prompt ${props.prompt.class}`} ref={props.innerRef}>
            <div className="prompt-left-arrow" />
            <h1>{props.prompt.headline}</h1>
            <h2>{props.prompt.text}</h2>
            <div className="sidebar-prompt-buttons">
              <button className="not-now-button" onClick={() => props.hide(false)}>NOT NOW</button>
              <button className="log-in-button">LOG IN</button>
            </div>
          </animated.div>
        ) : (
          ""
        )
      )}
    </>
  );
};

export default SidebarPrompt;
