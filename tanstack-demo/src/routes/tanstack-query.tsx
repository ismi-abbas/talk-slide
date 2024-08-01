import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Fragment } from "react";

export const Route = createFileRoute("/tanstack-query")({
  component: () => (
    <Fragment>
      <div className="flex gap-2">
        <Link
          to="/tanstack-query"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{
            exact: true,
          }}
        >
          Query Sample
        </Link>
        <Link
          to="/tanstack-query/mutation"
          activeProps={{
            className: "font-bold",
          }}
        >
          Mutation Sample
        </Link>
      </div>

      <div className="w-full px-20">
        <Outlet />
      </div>
    </Fragment>
  ),
});
