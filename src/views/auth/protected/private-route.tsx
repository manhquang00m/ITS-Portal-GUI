import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({ children }: { children: ReactNode }) {
  let auth = false;
  return (
    <Route
      path={"/admin"}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
