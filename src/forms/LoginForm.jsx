import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, getMe, login } from "../slice/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authErrMessage, isLoadingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authErrMessage) {
      toast(authErrMessage);
    }

    return () => {
      dispatch(clearAuthError());
    };
  }, [authErrMessage]);

  const [formData, setformData] = useState({
    email: "admin@example.com",
    password: "test1234",
  });
  const [errMsg, setErrMsg] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setformData((cur) => ({ ...cur, [name]: value }));
  }

  function validate() {
    let err = {};
    if (!formData.password) err.password = "required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      err.email = "invalid email";
    if (!formData.email) err.email = "required";
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errObj = validate();

    if (Object.keys(errObj).length > 0) {
      setErrMsg(errObj);
      return;
    }
    setErrMsg({});
    dispatch(login(formData)).then((res) => {
      if (res.type === "login/fulfilled") {
        dispatch(getMe(res?.payload?.data?.token));
        // .then((response) => {
        //   if (response.type === "getMe/fulfilled") {
        //     // navigate("/");
        //   }
        // });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="text-start" noValidate>
      <InputContainer
        type={"email"}
        inputName={"email"}
        label={"Email"}
        handleChange={handleChange}
        err_msg={errMsg.email}
        val={formData.email}
      />
      <InputContainer
        type={"password"}
        inputName={"password"}
        label={"Password"}
        handleChange={handleChange}
        err_msg={errMsg.password}
        val={formData.password}
      />
      <div className="mt-8">
        <button
          disabled={isLoadingAuth}
          className="bg-sky-800 text-white w-full py-1 rounded text-center"
        >
          {isLoadingAuth ? (
            <span className="flex items-center justify-center gap-2">
              signing... <Spinner val={5} />
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </form>
  );
}

function InputContainer({
  inputName,
  label,
  type,
  handleChange,
  err_msg,
  val,
}) {
  return (
    <div className="mt-5">
      <label htmlFor={inputName} className="w-full block font-medium relative">
        {label}
        {err_msg && (
          <span className="absolute right-0 text-red-500 font-normal">
            {err_msg}
          </span>
        )}
      </label>
      <input
        type={type}
        id={inputName}
        name={inputName}
        placeholder={`Enter your ${label}`}
        onChange={handleChange}
        value={val}
        className="w-full border border-gray-300 mt-2 py-1 px-3 rounded bg-sky-50 focus:outline-1 focus:outline-gray-400"
      />
    </div>
  );
}

export default LoginForm;
