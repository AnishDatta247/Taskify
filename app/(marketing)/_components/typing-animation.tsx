"use client";

import { TypeAnimation } from "react-type-animation";

export const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "work forward", // Types 'One'
        2000, // Waits 1s
        "categorize tasks", // Deletes 'One' and types 'Two'
        2000, // Waits 2s
        "automate workflow", // Types 'Three' without deleting 'Two'
        2000,
        () => {
          console.log("Sequence completed");
        },
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      preRenderFirstString
      style={{ display: "inline-block" }}
    />
  );
};
