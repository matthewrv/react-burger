import { Location } from "react-router-dom";

export interface LocationState {
  backgroundLocation?: Location<LocationState>;
  from?: Location<LocationState>;
}
