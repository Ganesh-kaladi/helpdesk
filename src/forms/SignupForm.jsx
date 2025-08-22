import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, getMe, login, signUp } from "../slice/authSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

function SignupForm() {
  const dispatch = useDispatch();

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
    name: "",
    email: "",
    password_hash: "",
    confirmPassword: "",
  });
  const [errMsg, setErrMsg] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setformData((cur) => ({ ...cur, [name]: value }));
  }

  function validate() {
    let err = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      err.email = "invalid email";
    if (!formData.password_hash) err.password_hash = "required";
    if (!formData.email) err.email = "required";
    if (formData.confirmPassword !== formData.password_hash)
      err.confirmPassword = "password not match";
    if (!formData.name) err.name = "required";
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
    dispatch(signUp(formData)).then((res) => {
      if (res.type === "signUp/fulfilled") {
        setformData({
          name: "",
          email: "",
          password_hash: "",
          confirmPassword: "",
        });
        dispatch(getMe(res?.payload?.data?.token)).then((response) => {
          if (response.type === "getMe/fulfilled") {
            toast("account created");
          }
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="text-start" noValidate>
      <InputContainer
        type={"text"}
        inputName={"name"}
        label={"Full Name"}
        handleChange={handleChange}
        err_msg={errMsg.name}
      />
      <InputContainer
        type={"email"}
        inputName={"email"}
        label={"Email"}
        handleChange={handleChange}
        err_msg={errMsg.email}
      />
      <InputContainer
        type={"password"}
        inputName={"password_hash"}
        label={"Password"}
        handleChange={handleChange}
        err_msg={errMsg.password_hash}
      />
      <InputContainer
        type={"password"}
        inputName={"confirmPassword"}
        label={"Confirm Password"}
        handleChange={handleChange}
        err_msg={errMsg.confirmPassword}
      />
      <div className="mt-8">
        <button
          disabled={isLoadingAuth}
          className="bg-sky-800 text-white w-full py-1 rounded"
        >
          {isLoadingAuth ? (
            <span className="flex items-center justify-center gap-2">
              Creating... <Spinner val={5} />
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </form>
  );
}

function InputContainer({ inputName, label, type, handleChange, err_msg }) {
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
        className="w-full border border-gray-300 mt-2 py-1 px-3 rounded bg-sky-50 focus:outline-1 focus:outline-gray-400"
      />
    </div>
  );
}

export default SignupForm;
