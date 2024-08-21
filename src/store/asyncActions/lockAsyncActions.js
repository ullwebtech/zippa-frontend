import api, { cleanUpErr, cleanUpResponse } from "../helper";
import {
  isError,
  isLoading,
  updateMessage,
  updateLockSavings,
  updateLockSaving,
  updateLockTotal,
  updateBenefitSavings,
  updateBenefitSaving,
  updateBenefitTotal,
  updateKidSavings,
  updateKidSaving,
  updateKidTotal
} from "../slices/lockSlice";
import { getSavingsTotal, getTransactions, getWallet } from "./walletAsyncActions";

export const getFixedLockDetails = () => (dispatch) => {
  try {
    dispatch(getWallet());
    dispatch(getTransactions())
    dispatch(getSavingsTotal());
    dispatch(getFixedLocks());
    dispatch(getFixedLockTotal());
  } catch (err) {
    console.log(err);
  }
};

export const getBenefitDetails = () => (dispatch) => {
  try {
    dispatch(getWallet());
    dispatch(getSavingsTotal());
    dispatch(getBenefitLocks());
    dispatch(getBenefitLockTotal());
  } catch (err) {
    console.log(err);
  }
};

export const getKiddiesDetails = () => (dispatch) => {
  try {
    dispatch(getWallet());
    dispatch(getSavingsTotal());
    dispatch(getKidLocks());
    dispatch(getKidLockTotal());
  } catch (err) {
    console.log(err);
  }
};

export const createFixedLock = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/lock/fixed/wallet`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { fixed } = data;
      dispatch(updateLockSavings(fixed));
      dispatch(updateMessage("Fixed Lock Created Successfully"));
      dispatch(getFixedLockDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const createFixedLockCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/lock/fixed/card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { fixed } = data;
      dispatch(updateLockSavings(fixed));
      dispatch(updateMessage("Fixed Lock Created Successfully"));
      dispatch(getFixedLockDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const createFixedLockNewCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/lock/fixed/new-card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { fixed } = data;
      dispatch(updateLockSavings(fixed));
      dispatch(updateMessage("Fixed Lock Created Successfully"));
      dispatch(getFixedLockDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
};

export const getFixedLocks = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/lock/fixed`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { fixedLocks } = data;
      dispatch(updateLockSavings(fixedLocks));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const getFixedLock = (id) => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/lock/fixed/${id}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { fixedLock } = data;
      dispatch(updateLockSaving(fixedLock));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const getFixedLockTotal = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/lock/fixed/total`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { total } = data;
      dispatch(updateLockTotal(total));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const createBenefitLock = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/lock/benefit/wallet`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { benefit } = data;
      dispatch(updateBenefitSaving(benefit));
      dispatch(updateMessage("Benefit Lock Created Successfully"));
      dispatch(getBenefitDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}
export const createBenefitLockCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/lock/benefit/card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { benefit } = data;
      dispatch(updateBenefitSaving(benefit));
      dispatch(updateMessage("Benefit Lock Created Successfully"));
      dispatch(getBenefitDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const createBenefitLockNewCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/lock/benefit/new-card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { benefit } = data;
      dispatch(updateBenefitSaving(benefit));
      dispatch(updateMessage("Benefit Lock Created Successfully"));
      dispatch(getBenefitDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const getBenefitLocks = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/lock/benefit`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { benefits } = data;
      dispatch(updateBenefitSavings(benefits));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const getBenefitLock = (id) => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/lock/benefit/${id}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { benefit } = data;
      dispatch(updateBenefitSaving(benefit));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const getBenefitLockTotal = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/lock/benefit/total`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { total } = data;
      dispatch(updateBenefitTotal(total));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const createKidLock = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/lock/kiddies/wallet`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { kid } = data;
      dispatch(updateKidSaving(kid));
      dispatch(updateMessage("Kid Lock Created Successfully"));
      dispatch(getKiddiesDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const createKidLockCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/lock/kiddies/card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { kid } = data;
      dispatch(updateKidSaving(kid));
      dispatch(updateMessage("Kid Lock Created Successfully"));
      dispatch(getKiddiesDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const createKidLockNewCard = (data) => (dispatch) => {
  dispatch(isLoading());
  api
    .post(`/lock/kiddies/new-card`, data)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { kid } = data;
      dispatch(updateKidSaving(kid));
      dispatch(updateMessage("Kid Lock Created Successfully"));
      dispatch(getKiddiesDetails())
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const getKidLocks = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/lock/kiddies`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { kids } = data;
      dispatch(updateKidSavings(kids));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const getKidLock = (id) => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/lock/kiddies/${id}`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { kid } = data;
      dispatch(updateKidSaving(kid));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}

export const getKidLockTotal = () => (dispatch) => {
  dispatch(isLoading());
  api
    .get(`/lock/kiddies/total`)
    .then((res) => {
      const data = cleanUpResponse(res);
      const { total } = data;
      dispatch(updateKidTotal(total));
    })
    .catch((res) => {
      const err = cleanUpErr(res);
      const message = err?.message;
      dispatch(isError(message ? message : res.message));
    });
}
