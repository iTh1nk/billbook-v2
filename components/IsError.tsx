import React from "react";
import { useRouter } from "next/router";

export default function IsLoading() {
  const router = useRouter();
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="font-mono text-3xl animate-pulse">
          <span className="visible md:hidden cursor-default">
            An error has occurred...
          </span>
          <span
            onClick={() => window.location.replace("/")}
            className="hidden md:inline cursor-pointer"
          >
            An error has occurred . . .
          </span>
        </span>
      </div>
    </>
  );
}
