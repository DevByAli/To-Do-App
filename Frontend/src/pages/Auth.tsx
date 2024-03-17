import "./Auth.css";
import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Activation from "../components/Activation";

export default function Auth() {
  const [mode, setMode] = useState("signin");

  const changeMode = (mode: string) => {
    setMode(mode);
  };

  if (mode === "signin") {
    return <SignIn changeAuthMode={changeMode} />;
  } else if (mode === "signup") {
    return <SignUp changeAuthMode={changeMode} />;
  } else if (mode === "activation") {
    return <Activation changeAuthMode={changeMode} />;
  }
}
