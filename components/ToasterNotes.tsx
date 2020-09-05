import React from "react";
import toaster from "toasted-notes";

export default function ToasterNotes(isSuccess, duration) {
  return isSuccess === "success"
    ? toaster.notify(
        <div style={{ fontWeight: "bold", color: "darkgreen" }}>
          Successfully Completed
        </div>,
        {
          duration: duration,
        }
      )
    : isSuccess === "error"
    ? toaster.notify(
        <div style={{ fontWeight: "bold", color: "red" }}>Error Occurred</div>,
        {
          duration: duration,
        }
      )
    : toaster.notify(
        <div style={{ fontWeight: "bold", color: "red" }}>{isSuccess}</div>,
        {
          duration: duration,
        }
      );
}
