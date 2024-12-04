import { useEffect, useReducer } from "react";
import axios from "axios";
import * as reducerConstants from "./constants.js";
import toast from "../../Utility/toast.js";
import { reducer } from "./index";

const TOAST = {};

const initialState = {
  data: [],
  globalData: {},
  lastUpdated: 0,
  isLoading: true,
};

const CommonAction = ({ CRUDbaseUrl, getParams = {} }) => {
  const [reducerData, dispatch] = useReducer(reducer, initialState);

  const setLoading = (payload = true) =>
    dispatch({ type: reducerConstants.LOADING, payload });

  const fetchData = async () => {
    if (!reducerData.isLoading) {
      setLoading();
    }

    try {
      if (CRUDbaseUrl.read) {
        const res = await axios.get(CRUDbaseUrl.read, getParams);
        const payload = res.data;
        dispatch({
          type: reducerConstants.FETCH_SUCCESS,
          payload,
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast.error(
        (err.response && err.response.data.message) || "Something went wrong",
        TOAST,
        CRUDbaseUrl
      );
    }
  };

  const fetchSpecificData = async ({ loader = true, ...props }) => {
    if (loader) setLoading();
    try {
      const res = await axios.get(
        `${CRUDbaseUrl.readId}${props.data || ""}`,
        getParams
      );
      const payload = res.data.data || res.data;
      dispatch({
        type: reducerConstants.FETCH_SUCCESS,
        payload,
        concat: props.concat || false,
        key: props.key || false,
      });
      props.cb && props.cb(payload);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(
        (err.response && err.response.data.message) || "Something went wrong",
        TOAST,
        CRUDbaseUrl
      );
    }
  };

  const clearData = () => {
    dispatch({
      type: reducerConstants.CLEAR_STATE,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [reducerData, fetchSpecificData, clearData];
};

export default CommonAction;
