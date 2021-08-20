import React, { createContext, useState } from "react";

export const HistoryContext = createContext();

export const HistoryProvider = (props) => {
  const [userHistory, setUserHistory] = useState([]);
  const [navigation, setNavigation] = useState({ id: 0, location: null });
  const [tracker, setTracker] = useState(2);
  const [historyId, setHistoryId] = useState(0);
  const [leftNavigation, setLeftNavigation] = useState("");
  const [rightNavigation, setRightNavigation] = useState("");
  return (
    <HistoryContext.Provider
      value={{
        userHistory: [userHistory, setUserHistory],
        fromNav: [navigation, setNavigation],
        tracking: [tracker, setTracker],
        historyTracking: [historyId, setHistoryId],
        leftNavigation: [leftNavigation, setLeftNavigation],
        rightNavigation: [rightNavigation, setRightNavigation]
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
};
