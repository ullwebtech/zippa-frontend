import api, { base, cleanUpErr, cleanUpResponse } from "../helper";
import {
  updateUser,
  updateMessage,
  isError,
  isLoading,
  isVerified,
} from "../slices/userSlice";
import {
  getBenefitDetails,
  getFixedLockDetails,
  getKiddiesDetails,
} from "./lockAsyncActions";
import { getAutoSaveDetails, getFlexDetails } from "./targetAsyncActions";
import { getThriftDetails } from "./thriftAsyncActions";
import { getBanks, getCards, getTransactions } from "./walletAsyncActions";

export const register = (data) => (dispatch) => {
  dispatch(isLoading());
  base
    .post("/auth/register", data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { user, message } = data;
      dispatch(updateUser(user));
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      console.log(err);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const resendVerificationCode = (data) => (dispatch) => {
  dispatch(isLoading());
  base
    .post("/auth/resend-verification-code", data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const confirmVerification = (data) => (dispatch) => {
  dispatch(isLoading());
  base
    .post("/auth/confirm-verification", data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { user, token } = data;
      const auth = {
        token,
        userId: user.id,
      };
      localStorage.setItem("zippa::auth", JSON.stringify(auth));
      dispatch(updateUser(user));
      dispatch(updateMessage("Verification Successful"));
      dispatch(isVerified());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const login = (data) => (dispatch) => {
  dispatch(isLoading());
  base
    .post("/auth/login", data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { user } = data;
      const auth = {
        token: data.token,
        userId: user.id,
      };
      localStorage.setItem("zippa::auth", JSON.stringify(auth));
      dispatch(updateUser(user));
      dispatch(updateMessage("Login Successful"));
      dispatch(isVerified());
      dispatch(getCards());
      dispatch(getTransactions());
      dispatch(getFixedLockDetails());
      dispatch(getBenefitDetails());
      dispatch(getKiddiesDetails());
      dispatch(getAutoSaveDetails());
      dispatch(getFlexDetails());
      dispatch(getThriftDetails());
      dispatch(getBanks());
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const createPin = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post("/auth/create-pin", data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const resetMail = (data) => (dispatch) => {
  dispatch(isLoading());
  base
    .post("/auth/reset-mail", data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const resendCode = (data) => (dispatch) => {
  dispatch(isLoading());
  base
    .post("/auth/resend-code", data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const verifyCode = (data) => (dispatch) => {
  dispatch(isLoading());
  base
    .post("/auth/verify-code", data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const resetPassword = (data) => (dispatch) => {
  dispatch(isLoading());
  base
    .patch("/auth/reset-password", data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const logout = () => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/auth/logout`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const updateProfile = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .patch(`/auth/update-info`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { user, message } = data;
      dispatch(updateUser(user));
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const updatePin = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .patch(`/auth/update-pin`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const updateDp = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .patch(`/auth/update-dp`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message, user } = data;
      dispatch(updateUser(user))
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const verifyPin = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/auth/verify-pin`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const deleteAcct = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .delete(`/auth/delete-user`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message } = data;
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const verifyBVN = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/auth/verify-bvn`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { message, user } = data;
      dispatch(updateUser(user));
      dispatch(updateMessage(message));
    })
    .catch((res) => {
      console.log(res);
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};
