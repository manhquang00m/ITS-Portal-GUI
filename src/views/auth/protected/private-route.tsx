import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({ children, path }: { children: ReactNode, path: string }) {
  let auth = true;
  return (
    <Route
      path={path}
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
