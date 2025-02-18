import React from "react";

export default function ImageComponent() {
  return (
    <img
      src={"./public/logo.png"} // ✅ Make sure this path matches your public folder
      alt="App Logo"
      className="w-32 h-32"
    />
  );
}
