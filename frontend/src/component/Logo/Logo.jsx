import { useState, useEffect } from "react";

import "./Logo.css";

import logoTeeth from "../../images/teeth.svg";
import logoGuitar from "../../images/guitar.svg";
import logoProducing from "../../images/producing.svg";
import logoTrumpet from "../../images/trumpet.svg";
import logoPiano from "../../images/piano.svg";
import logoBass from "../../images/bass.svg";
import logoDutch from "../../images/dutch.svg";
import logoJavascript from "../../images/javascript.svg";
import logoSitups from "../../images/situps.svg";
import logoPushups from "../../images/pushups.svg";
import logoPullups from "../../images/pullups.svg";

export const Logo = (props) => {
  let image = "";
  switch (props.activity) {
    case "teeth":
      image = logoTeeth;
      break;
    case "guitar":
      image = logoGuitar;
      break;
    case "bass":
      image = logoBass;
      break;
    case "trumpet":
      image = logoTrumpet;
      break;
    case "piano":
      image = logoPiano;
      break;
    case "dutch":
      image = logoDutch;
      break;
    case "javascript":
      image = logoJavascript;
      break;
    case "producing":
      image = logoProducing;
      break;
    case "situps":
      image = logoSitups;
      break;
    case "pushups":
      image = logoPushups;
      break;
    case "pullups":
      image = logoPullups;
      break;
    default:
      image = null;
  }

  return (
    <div>
      <img className="logo" src={image} alt={props.activity} />
    </div>
  );
};