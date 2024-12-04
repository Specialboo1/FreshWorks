import { clubArray } from "../Functions/index.js";
import * as reducerConstants from "./constants.js";

export const reducer = (state, { type, payload, concat, key }) => {
  switch (type) {
    case reducerConstants.LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case reducerConstants.FETCH_SUCCESS:
      var previousMessageData = {};
      if (concat) {
        previousMessageData = { ...state.data, ...payload };
        previousMessageData.items = (state.data.items || state.data).concat(
          payload.items
        );
      } else if (concat && key) {
        previousMessageData = { ...state.data, ...payload };
        previousMessageData.items = (state.data.items || state.data).concat(
          payload.items
        );
        previousMessageData.items = clubArray(previousMessageData.items, key);
      }

      return {
        ...state,
        data: concat ? previousMessageData : payload,
        isLoading: false,
      };

    case reducerConstants.CLEAR_STATE:
      return {
        ...state,
        data: [],
      };
    case reducerConstants.FETCH_ERROR:
      return { ...state, data: [], isLoading: false };
    default:
      return state;
  }
};
