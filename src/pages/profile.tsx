import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userContext } from "@/provider/user-provider";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const userData = useContext(userContext); 
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    address: userData?.user?.address || '',
    phone: userData?.user?.phone || '',
  });

  const handleLogout = () => {
    if (userData) {
      userData.logout(); 
      navigate("/login"); 
    }
  };

  if (!userData || !userData.user) {
    return <p>Please log in to access your profile.</p>; 
  }
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // TODO: update user info
    console.log('Saving user info', formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Avatar and Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={userData.user.avatar || 'https://avatar.iran.liara.run/public/27'} 
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <Button onClick={handleLogout} className="mt-4 bg-red-500 text-white">Logout</Button>
        </div>

        {/* User Details */}
        <div className="flex flex-col space-y-4">
          <div className="text-xl font-semibold mb-2">
            <p>Hello, {userData.user.firstName}</p>
            <p className="text-gray-600">{userData.user.email}</p>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
              <Button onClick={handleSave} className="bg-blue-500 text-white">Save</Button>
            </div>
          ) : (
            <div>
              <p><strong>Address:</strong> {userData.user.address || 'N/A'}</p>
              <p><strong>Phone:</strong> {userData.user.phone || 'N/A'}</p>
              <Button onClick={handleEditToggle} className="bg-green-500 text-white">Edit</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
