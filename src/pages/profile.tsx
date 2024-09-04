import api from "@/api";
import { EditingForm, UserDetails } from "@/components/profile-form";
import { Button } from "@/components/ui/button";
import { userContext } from "@/provider/user-provider";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { user, update, logout } = useContext(userContext) || {};
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    user_id: user?.id || '',
    email: user?.email || '',
    password: user?.password || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address || '',
    phoneNumber: user?.phoneNumber || '',
    birthDate: user?.birthDate || '23-03-1993',
    avatar: user?.avatar || '',
  });

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate("/login");
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!user) return;

      const token = localStorage.getItem("token");

      const response = await api.put(
        "/users",
        {
          id: formData.user_id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
          email: user.email,
          birthDate: formData.birthDate,
          role: "ADMIN",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to save user info");

      update?.({
        ...user,
        ...formData,
      });

      console.log("User info saved successfully", formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user info", error);
    }
  };

  if (!user) {
    return <p>Please log in to access your profile.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Avatar and Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={formData.avatar || "http://placekitten.com/200/300"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <Button onClick={handleLogout} className="mt-4 bg-red-500 text-white">
            Logout
          </Button>
        </div>

        {/* User Details */}
        <div className="flex flex-col space-y-4">
          <div className="text-xl font-semibold mb-2">
            <p>Hello, {formData.firstName}</p>
            <p className="text-gray-600">{formData.email}</p>
          </div>

          {isEditing ? (
            <EditingForm
              formData={formData}
              handleChange={handleChange}
              handleSave={handleSave}
            />
          ) : (
            <UserDetails
              user={formData}
              handleEditToggle={handleEditToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

