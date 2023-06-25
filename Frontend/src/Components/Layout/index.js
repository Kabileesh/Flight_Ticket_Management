import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import HeaderLayOut from "./HeaderLayout";
import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Spinner } from "reactstrap";
import AdminHeader from "./AdminHeader";

const Layout = () => {
  const [loading, setLoading] = useState("idle");
  const [username,setUsername] = useState("");
  const [isAdmin,setIsAdmin] = useState(false)
  const navigate = useNavigate();
  const logoutHandler = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const accessToken = window.sessionStorage.getItem("accessToken");
        setLoading("loading");
        const response = await axios.post("/verify-token", {
          token: accessToken,      
        });
        if (!response.data?.username) {
          
          logoutHandler();
        }
        setUsername(response.data?.username);
        setIsAdmin(response.data?.isAdmin);
      } catch (err) {
        logoutHandler();
      } finally {
        setLoading("succeeded");
      }
    };
    if (loading === "idle") verifyUser();
  }, []);
  if (loading==="loading") return <Spinner color="primary" style={{textAlign:"center", marginTop:"10%"}}/>
  if (loading === "succeeded")
    return (
      <div>
        {
          isAdmin ? <AdminHeader user={username} isAdmin={isAdmin}/> : 
          <HeaderLayOut user={username} isAdmin={isAdmin}/>
        }
        <Outlet/>
      </div>
    );
};
export default Layout;