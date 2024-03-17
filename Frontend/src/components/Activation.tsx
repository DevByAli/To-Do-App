import React, { useState, useRef } from "react";
import { IChangeMode } from "../interfaces/IChangeMode";
import APIClient from "../services/api-client";
import toast, { Toaster } from "react-hot-toast";
import { IAuth } from "../interfaces/IAuth";

export default function Activation({ changeAuthMode }: IChangeMode) {
  const [isLoading, setIsLoading] = useState(false);
  const [codes, setCodes] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  // ********************************************
  // Handle the change in the value of the form
  // ********************************************
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (
      value === "" &&
      event.nativeEvent.inputType === "deleteContentBackward"
    ) {
      handleBackspace(index);
    } else if (isValidInput(value)) {
      handleValidInput(index, value);
    }
  };

  const isValidInput = (value: string) => {
    return value.length <= 1 && !isNaN(Number(value));
  };

  const handleBackspace = (index: number) => {
    if (index >= 0) {
      const newCodes = [...codes];
      newCodes[index] = "";
      setCodes(newCodes);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleValidInput = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ********************************************
  // Handle the verification of the the account
  // ********************************************
  const handleVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiClient = new APIClient("activate-account");
    setIsLoading(true);

    const activationCode = codes.join("");
    const activationToken = localStorage.getItem("token") as string;

    apiClient
      .post({ activationToken, activationCode })
      .then((result: IAuth) => {
        // the account if verified
        toast.success(result.message);

        // delete the token from the localStorage
        localStorage.removeItem("token");

        // changeMode after 2 seconds so that toast will appear properly
        setTimeout(() => changeAuthMode("signin"), 1000);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="Auth-form-container">
      <Toaster />
      <form className="Auth-form" onSubmit={handleVerification}>
        <i
          className="bi bi-arrow-left btn mx-2"
          onClick={() => changeAuthMode("signup")}
        ></i>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Enter Activation Code</h3>
          <div className="d-flex justify-content-center mb-3">
            {codes.map((code, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                className="form-control mx-1 text-center"
                maxLength={1}
                value={code}
                onChange={(e) => handleChange(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                required
              />
            ))}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
