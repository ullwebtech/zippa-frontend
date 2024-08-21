import api, { cleanUpErr, cleanUpResponse } from "../helper";
import {
  isError,
  isLoading,
  updateMessage,
  updateCableVariations,
  updateDataVariations,
  updateMeter,
  updateToken,
  updateDecoder,
} from "../slices/billsSlice";
import { getTransactions } from "./walletAsyncActions";

export const getDataVariations = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/bills/variations/${data}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { variations } = data;
      dispatch(updateDataVariations(variations));
      dispatch(updateMessage("Data Variations Loaded Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getCableVariations = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/bills/variations/${data}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { variations } = data;
      dispatch(updateCableVariations(variations));
      dispatch(updateMessage("Cable Variations Loaded Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const buyAirtime = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/bills/airtime`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      dispatch(updateMessage(data.message));
      dispatch(getTransactions());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const buyData = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/bills/data`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      dispatch(updateMessage(data.message));
      dispatch(getTransactions());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const verifyMeter = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/bills/meter`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { details } = data;
      dispatch(updateMeter(details));
      dispatch(updateMessage("Meter Verified"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const buyElectricity = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/bills/electricity`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      dispatch(updateMessage(data.message));
      dispatch(getTransactions());
      if (data.token) {
        dispatch(updateToken(data.token));
      }
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const verifyDecoder = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/bills/verify`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { details } = data;
      dispatch(updateDecoder(details));
      dispatch(updateMessage("Decoder Verified"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const subscribeCable = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/bills/cable`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      dispatch(updateMessage(data.message));
      dispatch(getTransactions());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};
