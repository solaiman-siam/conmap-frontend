import { useState } from "react";
import { MainContext } from "./StateContext";

function StateContextProvider({ children }) {
  const [userEmail, setUserEmail] = useState("");
  const [isToken, setIsToken] = useState(false);
  const [projectId, setProjectId] = useState(null)
  const [isRightBarOpen, setIsRightBarOpen] = useState(false);


    const [sByProject, setSByProject] = useState("");
    const [sByAddress, setSByAddress] = useState("");
    const [sByClient, setSByClient] = useState("");
    const [sByLocalAuthority, setSByLocalAuthority] = useState("");
    const [currentLat, setCurrentLat] = useState("");
    const [currentLong, setCurrentLong] = useState("");
    const [radius, setRadius] = useState("");

  const stateInfo = {
    userEmail,
    setUserEmail,
    setIsToken,
    isToken,
    setProjectId, 
    projectId,
    setIsRightBarOpen,
    isRightBarOpen,
    sByProject,
    setSByProject,
    sByAddress,
    setSByAddress,
    sByClient,
    setSByClient,
    sByLocalAuthority,
    setSByLocalAuthority,
    currentLat,
    setCurrentLat,
    currentLong,
    setCurrentLong,
    radius,
    setRadius


  };

  return (
    <MainContext.Provider value={stateInfo}>{children}</MainContext.Provider>
  );
}

export default StateContextProvider;
