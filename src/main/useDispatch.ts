import { useDispatch as OriginalUseDispatch } from "react-redux";
import { AppDispatch } from "./storeTypes";

// Redefine useDispatch to only allow dispatching things this
// application's store expects to receive;
// Fixes a Bug in react-redux 7.1.1 return value that will not
// allow chaining promises.

const useDispatch: () => AppDispatch = OriginalUseDispatch;

export { useDispatch };
