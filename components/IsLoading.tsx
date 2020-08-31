import React from "react";

export default function IsLoading() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="font-mono text-3xl animate-pulse">Loading...</span>
      </div>
    </>
  );
}
