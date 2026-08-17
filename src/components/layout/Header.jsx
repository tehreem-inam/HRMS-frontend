import {
  
  HiBell,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { HiMenu } from "react-icons/hi";
import {
  HiUser, 
  HiCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/slices/authSlice";
const Header = ({ onMenuClick }) => {
  const { user } = useSelector((state) => state.auth);

  const fullName =
    user?.full_name ||
    user?.name ||
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
    "User";

  const role =
    user?.role?.name ||
    user?.role ||
    "User";

  const avatar =
    fullName.charAt(0).toUpperCase();
    const dispatch = useDispatch();
const navigate = useNavigate();
const handleLogout = () => {
  dispatch(logout());

  navigate("/login", {
    replace: true,
  });
};

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <HiMenu size={26} />
        </button>

        <div className="hidden w-80 items-center rounded-lg border px-3 py-2 md:flex">
          <HiMagnifyingGlass className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-2 w-full outline-none"
          />
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button className="relative">
          <HiBell size={24} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <Menu as="div" className="relative">

     <MenuButton className="flex items-center gap-3 rounded-lg p-1 hover:bg-gray-100">

  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
    {avatar}
  </div>

  <div className="hidden text-left md:block">
    <p className="font-semibold">
      {fullName}
    </p>

    <p className="text-xs text-gray-500">
      {role}
    </p>
  </div>

</MenuButton>
<MenuItems
  anchor="bottom end"
  className="mt-3 w-60 rounded-xl border bg-white shadow-lg focus:outline-none"
>

  <div className="border-b p-4">

    <p className="font-semibold">
      {fullName}
    </p>

    <p className="text-sm text-gray-500">
      {role}
    </p>

  </div>

  <MenuItem>

    <button
      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100"
    >
      <HiUser />

      My Profile
    </button>

  </MenuItem>

  <MenuItem>

    <button
      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100"
    >
      <HiCog6Tooth />

      Settings
    </button>

  </MenuItem>

  <div className="border-t">

    <MenuItem>

      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
      >
        <HiArrowRightOnRectangle />

        Logout
      </button>

    </MenuItem>

  </div>

</MenuItems>

        </Menu>

      </div>

    </header>
  );
};

export default Header;