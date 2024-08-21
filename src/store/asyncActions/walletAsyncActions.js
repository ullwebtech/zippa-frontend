import api, { cleanUpErr, cleanUpResponse } from "../helper";
import {
  isError,
  isLoading,
  updateMessage,
  updateWallet,
  updateSavings,
  updateCards,
  updateBanks,
  updateTransactions,
  updateTransferDetails,
  updateTransferState,
} from "../slices/walletSlice";

export const getWallet = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/wallet`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { wallet } = data;
      dispatch(updateWallet(wallet));
      dispatch(updateMessage("Wallet Fetched Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getSavingsTotal = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/wallet/savings`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { total } = data;
      dispatch(updateSavings(total));
      dispatch(updateMessage("Savings Fetched Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getCards = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/wallet/cards`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { cards } = data;
      dispatch(updateCards(cards));
      dispatch(updateMessage("Cards Fetched Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getTransactions = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/wallet/transactions`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { transactions } = data;
      dispatch(updateTransactions(transactions));
      dispatch(updateMessage("Transactions Fetched Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const initiateTopup = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/wallet/topup`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      dispatch(updateMessage(data.message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const verifyTopup = (id, data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/wallet/verify/${id}`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      dispatch(updateMessage(data.message));
      dispatch(getWallet());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const periodicFetch = () => (dispatch) => {
  try {
    dispatch(getWallet());
    dispatch(getSavingsTotal());
    dispatch(getCards());
    dispatch(getTransactions());
  } catch (err) {
    console.log(err);
  }
};

export const getBanks = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/withdraw/banks`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { banks } = data;
      dispatch(updateBanks(banks));
      dispatch(updateMessage("Banks Fetched Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const verifyAcct = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/withdraw/verify-acct`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { data: details } = data;
      dispatch(updateTransferDetails(details));
      dispatch(updateMessage("Acct Verified Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const createTransferReceipt = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/withdraw/create-transfer-recipient`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { data: details } = data;
      dispatch(updateTransferState(details));
      dispatch(updateMessage("Receiver created Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const initiateTransfer = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/withdraw/initiate-transfer`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { data: details } = data;
      dispatch(updateTransferDetails(details));
      dispatch(updateMessage("Transfer Initiated Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const verifyTransfer = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/withdraw/verify-transfer`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { data: details } = data;
      dispatch(updateTransferDetails(details));
      dispatch(getTransactions())
      dispatch(updateMessage("Transfer Verified Successfully"));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};
