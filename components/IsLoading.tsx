import React from "react";

export default function IsLoading() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center transition ease-in-out duration-500 transform">
        <span className="font-mono text-3xl animate-pulse">
          <span className="visible md:hidden cursor-default">Loading...</span>
          <span className="hidden md:inline cursor-default">
            Loading . . .
          </span>
        </span>
      </div>
    </>
  );
}
