import React, { useContext, useState } from "react";
import { Menu, Button, Drawer, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  HomeOutlined,
  FireOutlined,
  InfoCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import { UserContext } from "../context/UserContext";
import Logo from "../assets/logob.png";
import userLogo from "../assets/user.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { user, userData, setUser } = useContext(UserContext);

  const logoutHandler = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
    setVisible(false);
  };

  const closeDrawerAndNavigate = (path) => {
    setVisible(false);
    navigate(path);
  };

  const getUserImage = () => {
    return userData?.photoURL || user?.photoURL || userLogo;
  };

  const userMenuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: (
        <span onClick={() => navigate("/dashboard/profile")}>Profile</span>
      ),
    },
    {
      key: "2",
      icon: <FireOutlined />,
      label: <span onClick={() => navigate("/dashboard/diet")}>Diet</span>,
    },
    {
      key: "3",
      icon: <FireOutlined />,
      label: (
        <span onClick={() => navigate("/dashboard/progress")}>Progress</span>
      ),
    },
    {
      key: "4",
      icon: <FireOutlined />,
      label: (
        <span onClick={() => navigate("/dashboard/subscription")}>
          Attendance
        </span>
      ),
    },
    user?.email === "muhammadsubhan192128@gmail.com" && {
      key: "5",
      icon: <FireOutlined />,
      label: <span onClick={() => navigate("/dashboard/admin")}>Admin</span>,
    },
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: <span onClick={logoutHandler}>Logout</span>,
    },
  ].filter(Boolean);

  const mobileMenu = (
    <Menu mode="vertical" className="w-full bg-black text-white">
      <Menu.Item
        icon={<HomeOutlined />}
        onClick={() => closeDrawerAndNavigate("/")}
      >
        Home
      </Menu.Item>
      <Menu.Item
        icon={<InfoCircleOutlined />}
        onClick={() => closeDrawerAndNavigate("/proteins")}
      >
        Proteins
      </Menu.Item>
      {user ? (
        <>
          <Menu.Item
            icon={<UserOutlined />}
            onClick={() => closeDrawerAndNavigate("/dashboard/profile")}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            icon={<FireOutlined />}
            onClick={() => closeDrawerAndNavigate("/dashboard/diet")}
          >
            Diet
          </Menu.Item>
          <Menu.Item
            icon={<FireOutlined />}
            onClick={() => closeDrawerAndNavigate("/dashboard/progress")}
          >
            Progress
          </Menu.Item>
          <Menu.Item
            icon={<FireOutlined />}
            onClick={() => closeDrawerAndNavigate("/dashboard/subscription")}
          >
            Attendance{" "}
          </Menu.Item>
          {user.email === "muhammadsubhan192128@gmail.com" && (
            <Menu.Item
              icon={<FireOutlined />}
              onClick={() => closeDrawerAndNavigate("/dashboard/admin")}
            >
              Admin
            </Menu.Item>
          )}
          <Menu.Item icon={<LogoutOutlined />} onClick={logoutHandler}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <Menu.Item
          icon={<LoginOutlined />}
          onClick={() => closeDrawerAndNavigate("/login")}
        >
          Login
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-black via-cyan-900 to-black px-4 py-2 shadow-md border-b border-cyan-700 flex items-center justify-between text-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={Logo} alt="Gym Logo" className="w-10 h-10 object-contain" />
        </Link>
        <Link
          to="/"
          className="text-xl font-bold text-white hover:text-cyan-400 transition"
        >
          BuilderGym
        </Link>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="hover:text-cyan-400 transition">
          Home
        </Link>
        <Link to="/proteins" className="hover:text-cyan-400 transition">
          Proteins
        </Link>
        {user ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <img
              src={getUserImage()}
              alt="User"
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-cyan-400"
            />
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button className="bg-cyan-500 hover:bg-cyan-600 border-none text-white">
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile Navbar Toggle */}
      <div className="md:hidden">
        {user ? (
          <img
            src={getUserImage()}
            alt="User"
            className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-cyan-400"
            onClick={() => setVisible(true)}
          />
        ) : (
          <Button icon={<MenuOutlined />} onClick={() => setVisible(true)} />
        )}
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        title={null}
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width={280}
        headerStyle={{ display: "none" }}
        bodyStyle={{
          background: "linear-gradient(to bottom, #0f172a, #0e7490)",
          color: "white",
          padding: 0,
        }}
      >
        <div className="text-white h-full flex flex-col justify-between">
          {/* Top Logo + Name */}
          <div className="bg-gradient-to-r from-black via-gray-900 to-black p-4 border-b border-cyan-700">
            <div className="flex items-center gap-3 px-2">
              <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
              <h2 className="text-xl font-semibold text-cyan-400">
                BuilderGym
              </h2>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-4 pt-4 bg-gradient-to-r from-black via-gray-900 to-black p-4">
            {/* Removed bg from menu items */}
            <Menu mode="vertical" className="  border-none">
              {mobileMenu.props.children}
            </Menu>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-cyan-200 py-4 border-t border-cyan-700">
            © {new Date().getFullYear()} BuilderGym
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
