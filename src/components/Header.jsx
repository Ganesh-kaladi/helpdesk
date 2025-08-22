import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="h-full px-2 flex items-center">
      <h3 className="text-2xl">Welcome back, {user?.name}</h3>
    </div>
  );
}

export default Header;
