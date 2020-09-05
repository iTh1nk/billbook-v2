import React from "react";
import toaster from "toasted-notes";

export default function ToasterNotes(isSuccess, duration) {
  return isSuccess === "success"
    ? toaster.notify(
        ({ onClose }) => (
          <div
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "green",
              backgroundColor: "darkgray",
              padding: "1em",
              borderRadius: "2em",
            }}
          >
            <a style={{ textDecoration: "none" }} onClick={onClose}>
              Successfully Completed
            </a>
          </div>
        ),
        {
          duration: duration,
        }
      )
    : isSuccess === "error"
    ? toaster.notify(
        ({ onClose }) => (
          <div
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "red",
              backgroundColor: "darkgray",
              padding: "1em",
              borderRadius: "2em",
            }}
          >
            <a style={{ textDecoration: "none" }} onClick={onClose}>
              Error Occurred
            </a>
          </div>
        ),
        {
          duration: duration,
        }
      )
    : toaster.notify(
        <div style={{ fontWeight: "bold", color: "white" }}>{isSuccess}</div>,
        {
          duration: duration,
        }
      );
}
