import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div>
          <h1>Oops</h1>
          <p>
            {isRouteErrorResponse(error)
              ? "This page does not exist"
              : "Sorry, something went wrong!"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
