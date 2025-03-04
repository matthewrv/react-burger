import { Location } from "react-router-dom";

export type TLocationState = {
  backgroundLocation?: Location<TLocationState>;
  from?: Location<TLocationState>;
}
