import React from "react";

import {
  ErrorBoundary as ReactErrorBoundary
} from "react-error-boundary";
import { useLocation, LocationProvider, Link, Router } from "@reach/router";

const FallbackComponent = ({ resetErrorBoundary, error }) => {
  return (
    <div>
      <h1>There was an error!</h1>
      {(error?.message && <p>{error.message}</p>) ??
      (error && <p>{JSON.stringify(error)}</p>)}
    </div>
  );
};

export const ErrorBoundary = ({ children }) => {
  const location = useLocation();
  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      resetKeys={[location]}
    >
      {children}
    </ReactErrorBoundary>
  );
};

const ErrorPage = (props) => {
  throw new Error("error!");
  return <p>errorpage</p>;
};

const NoError = (props) => <p>no error</p>;

function App() {
  return (
    <LocationProvider>
      <p><Link to="/no-error">noerror</Link></p>
      <p><Link to="/">error</Link></p>
      <ErrorBoundary>
        <Router>
          <ErrorPage path="/" />
          <NoError path="/no-error" />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}
export default App;
