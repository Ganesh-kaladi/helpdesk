import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../slice/authSlice";
import { clearConfig } from "../slice/configSlice";
import { clearKB } from "../slice/kbSlice";
import { clearTicket } from "../slice/ticketSlice";

function JWTexpiry({ children }) {
  const dispatch = useDispatch();

  const { authErrName } = useSelector((state) => state.auth);
  const { kbErrName } = useSelector((state) => state.kb);
  const { configErrName } = useSelector((state) => state.config);
  const { ticketErrName } = useSelector((state) => state.ticket);

  async function clearStore(params) {
    await dispatch(clearAuth());
    await dispatch(clearConfig());
    await dispatch(clearKB());
    await dispatch(clearTicket());
  }

  if (
    authErrName === "JsonWebTokenError" ||
    authErrName === "TokenExpiredError" ||
    kbErrName === "JsonWebTokenError" ||
    kbErrName === "TokenExpiredError" ||
    configErrName === "JsonWebTokenError" ||
    configErrName === "TokenExpiredError" ||
    ticketErrName === "TokenExpiredError" ||
    ticketErrName === "TokenExpiredError"
  ) {
    clearStore();
  }

  return children;
}

export default JWTexpiry;
