import { Button } from "@/components/ui/button";
import { userContext } from "@/provider/user-provider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const userData = useContext(userContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    if (userData) {
      userData.logout(); 
      navigate("/login"); 
    }
  };

  if (!userData || !userData.user) {
    return <p>Please log in to access your profile.</p>; 
  }

  return (
    <div>
      <p>Hello, {userData.user.firstName}</p>  
      <Button onClick={handleLogout}>Logout</Button>  
    </div>
  );
}
