import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faAngry,
  faGrinTongueSquint,
  faGrimace,
  faGrin,
  faMeh,
  faSadTear,
  faSurprise,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

export const createFaLibrary = () => {
  library.add(
    faSpinner,
    faAngry,
    faGrinTongueSquint,
    faGrimace,
    faGrin,
    faMeh,
    faSadTear,
    faSurprise,
    faTimesCircle
  );
};
