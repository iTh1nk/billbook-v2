import React from "react";

export default function IsLoading() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="font-mono text-3xl animate-pulse">
          <span className="visible md:hidden cursor-default">An error has occurred...</span>
          <span className="hidden md:inline cursor-default">
          An error has occurred . . .{" "}
          </span>
        </span>
      </div>
    </>
  );
}
