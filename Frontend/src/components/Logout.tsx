import toast from "react-hot-toast";
import { LogoutService } from "../services/Logout.service";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    LogoutService((error?: string, result?: string) => {
      if (result) {
        toast.success(result);

        setTimeout(() => navigate("/"), 1000);
      } else if (error) {
        toast.error(error);
      }
    });
  };

  return (
    <div className="bg-circle cursor-pointer" onClick={handleLogout}>
      <i className="bi bi-box-arrow-left text-white fs-3 cursor-pointer"></i>
    </div>
  );
}
