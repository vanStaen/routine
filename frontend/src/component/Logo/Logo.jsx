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
import logoCode from "../../images/code.svg";
import logoRun from "../../images/run.svg";
import logoStretch from "../../images/stretch.svg";
import logoPhoto from "../../images/photo.svg";
import logoWater from "../../images/water.svg";
import logoClimb from "../../images/climb.svg";
import logoSort from "../../images/bye.svg";
import logoClean from "../../images/clean.svg";
import logoFrench from "../../images/french.svg";
import logoMeditation from "../../images/meditation.svg";
import logoFriends from "../../images/friends.svg";
import logoSteps from "../../images/steps.svg";
import logoYoga from "../../images/yoga.svg";

export const Logo = (props) => {
  let image = "";
  switch (props.activity.activity) {
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
    case "code":
      image = logoCode;
      break;
    case "run":
      image = logoRun;
      break;
    case "stretch":
      image = logoStretch;
      break;
    case "photo":
      image = logoPhoto;
      break;
    case "water":
      image = logoWater;
      break;
    case "climb":
      image = logoClimb;
      break;
    case "sort":
      image = logoSort;
      break;
    case "clean":
      image = logoClean;
      break;
    case "french":
      image = logoFrench;
      break;
    case "meditation":
      image = logoMeditation;
      break;
    case "friends":
      image = logoFriends;
      break;
    case "steps":
      image = logoSteps;
      break;
    case "yoga":
      image = logoYoga;
      break;
    default:
      image = null;
  }

  return (
    <div>
      <img className="logo" src={image} alt={props.activity.activity} />
    </div>
  );
};
