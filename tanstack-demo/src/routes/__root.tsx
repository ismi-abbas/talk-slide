import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen w-screen">
      <div className="p-2 flex gap-2 items-center justify-center">
        <Link to="/" className="[&.active]:font-bold ">
          Home
        </Link>{" "}
        <Link to="/tanstack-query" className="[&.active]:font-bold">
          Using Tanstack
        </Link>
      </div>
      <hr />
      <div className="flex items-center justify-center flex-col w-full">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
