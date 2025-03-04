import { useDispatch, useSelector, useStore } from "react-redux";
import type { TAppDispatch, TAppStore, TRootState } from "./store";
import { Location, useLocation } from "react-router-dom";
import { ILocationState } from "../utils/location-state";

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
export const useAppStore = useStore.withTypes<TAppStore>();
export const useAppLocation = (): Location<ILocationState> => useLocation();
