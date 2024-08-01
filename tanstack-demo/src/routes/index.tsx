import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import SimpleFetching from "../components/category";

export const IndexComponent = () => {
  const [priority, setPriority] = useState("Low");

  const handlePriority = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPriority(e.currentTarget.textContent || "");
  };

  return (
    <Fragment>
      <div className="flex gap-2 items-center justify-center mt-10">
        <button onClick={handlePriority} className="border p-2 rounded-md">
          Low
        </button>
        <button onClick={handlePriority} className="border p-2 rounded-md">
          Medium
        </button>
        <button onClick={handlePriority} className="border p-2 rounded-md">
          High
        </button>
      </div>

      <SimpleFetching priority={priority} />
    </Fragment>
  );
};

export const Route = createFileRoute("/")({
  component: IndexComponent,
});
