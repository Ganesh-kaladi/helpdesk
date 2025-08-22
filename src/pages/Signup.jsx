import { useNavigate } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";

function Signup() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="text-center sm:w-[380px]">
        <span>logo</span>
        <h2 className="font-bold text-3xl">smart helpdesk</h2>
        <p className="text-sm">Create your account</p>
        <div className="mt-4 bg-white border border-slate-200 p-4 rounded-lg shadow-xl shadow-gray-300">
          <h4 className="text-xl font-medium">Create Account</h4>
          <span className="text-sm">Join our AI-powered support system</span>
          <SignupForm />
          <p className="mt-6">
            Already have an account?&nbsp;
            <span onClick={() => navigate("/login")} className="text-blue-700">
              sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
