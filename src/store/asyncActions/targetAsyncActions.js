import api, { cleanUpErr, cleanUpResponse } from "../helper";
import {
  isError,
  isLoading,
  updateMessage,
  updateAutoSaving,
  updateAutoSavings,
  updateAutosaveTotal,
  updateFlexTotal,
  updateFlexTrans,
  updateWithdrawDate,
} from "../slices/targetSlice";
import { getSavingsTotal, getTransactions, getWallet } from "./walletAsyncActions";

export const getAutoSaveDetails = () => (dispatch) => {
  try {
    dispatch(getWallet());
    dispatch(getTransactions())
    dispatch(getSavingsTotal());
    dispatch(getAutoSaves());
    dispatch(getAutosaveTotal());
  } catch (err) {
    console.log(err);
  }
};

export const getFlexDetails = () => (dispatch) => {
  try {
    dispatch(getWallet());
    dispatch(getSavingsTotal());
    dispatch(getFlexTotal());
    dispatch(getFlexTrans());
    dispatch(getWithdrawDate());
  } catch (err) {
    console.log(err);
  }
};

export const createAutoSave = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/target/autosave/wallet`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      console.log(data, data.autoSave);
      const { autoSave } = data;
      dispatch(updateAutoSaving(autoSave));
      dispatch(updateMessage("Autosave Created Successfully"));
      dispatch(getAutoSaveDetails());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const createAutoSaveCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/target/autosave/card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      console.log(data, data.autoSave);
      const { autoSave } = data;
      dispatch(updateAutoSaving(autoSave));
      dispatch(updateMessage("Autosave Created Successfully"));
      dispatch(getAutoSaveDetails());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const createAutoSaveNewCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/target/autosave/new-card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      console.log(data, data.autoSave);
      const { autoSave } = data;
      dispatch(updateAutoSaving(autoSave));
      dispatch(updateMessage("Autosave Created Successfully"));
      dispatch(getAutoSaveDetails());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getAutoSaves = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/target/autosave`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { autoSaves } = data;
      dispatch(updateAutoSavings(autoSaves));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getAutoSave = (id) => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/target/autosave/${id}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { autoSave } = data;
      dispatch(updateAutoSaving(autoSave));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getAutosaveTotal = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/target/autosave/total`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { total } = data;
      dispatch(updateAutosaveTotal(total));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const topupFlex = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .patch(`/target/flex/wallet`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      console.log(data);
      dispatch(updateMessage("Flex Topped Up Successfully"));
      dispatch(getFlexDetails());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const topupFlexCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .patch(`/target/flex/card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      console.log(data);
      dispatch(updateMessage("Flex Topped Up Successfully"));
      dispatch(getFlexDetails());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const topupFlexNewCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .patch(`/target/flex/new-card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      console.log(data);
      dispatch(updateMessage("Flex Topped Up Successfully"));
      dispatch(getFlexDetails());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getWithdrawDate = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/target/flex/withdraw-date`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { withdrawDate } = data;
      dispatch(updateWithdrawDate(withdrawDate))
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const withdrawFlex = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .patch(`/target/flex/withdraw`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      console.log(data);
      dispatch(updateMessage("Flex Withdrawn Successfully"));
      dispatch(getFlexDetails());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getFlexTotal = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/target/flex`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { total } = data;
      dispatch(updateFlexTotal(total));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getFlexTrans = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/target/flex/transactions`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { transactions } = data;
      dispatch(updateFlexTrans(transactions));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};
