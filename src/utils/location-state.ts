import { Location } from "react-router-dom";

export interface ILocationState {
  backgroundLocation?: Location<ILocationState>;
  from?: Location<ILocationState>;
}
