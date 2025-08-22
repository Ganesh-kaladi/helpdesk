import { useNavigate } from "react-router-dom";
import LoginForm from "../forms/LoginForm";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="text-center sm:w-[380px]">
        <span>logo</span>
        <h2 className="font-bold text-3xl">smart helpdesk</h2>
        <p className="text-sm">AI-Powered Support System</p>
        <div className="mt-4 bg-white border border-slate-200 p-4 rounded-lg shadow-xl shadow-gray-300">
          <h4 className="text-xl font-medium">Sign In</h4>
          <span className="text-sm">
            Enter your credentials to access your dashboard
          </span>
          <LoginForm />
          <p className="mt-6">
            Don't have an account?&nbsp;
            <span
              onClick={() => navigate("/sign-up")}
              className="text-blue-700"
            >
              sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
