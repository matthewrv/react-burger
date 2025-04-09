import { TOrdersFeedResponse } from "../../utils/normaApi/models";
import { WebsocketStatus } from "./websocket";

export type TOrdersFeed = Omit<TOrdersFeedResponse, "success">;

export type TOrdersFeedState = TOrdersFeed & {
  status: WebsocketStatus;
  error: string;
};
