import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userContext } from "@/provider/user-provider";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userContextData?.user?.firstName || '',
    lastName: userContextData?.user?.lastName || '',
    address: userContextData?.user?.address || '',
    phone: userContextData?.user?.phone || '',
  });

  const handleLogout = () => {
    if (userContextData?.logout) {
      userContextData.logout();
      navigate("/login");
    }
  };

  if (!userContextData?.user) {
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
    // TODO: Save user info using API
    console.log('Saving user info', formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Avatar and Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={userContextData.user.avatar || 'http://placekitten.com/200/300'} 
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <Button onClick={handleLogout} className="mt-4 bg-red-500 text-white">Logout</Button>
        </div>

        {/* User Details */}
        <div className="flex flex-col space-y-4">
          <div className="text-xl font-semibold mb-2">
            <p>Hello, {userContextData.user.firstName}</p>
            <p className="text-gray-600">{userContextData.user.email}</p>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </div>
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
              <p><strong>First Name:</strong> {userContextData.user.firstName || 'N/A'}</p>
              <p><strong>Last Name:</strong> {userContextData.user.lastName || 'N/A'}</p>
              <p><strong>Address:</strong> {userContextData.user.address || 'N/A'}</p>
              <p><strong>Phone:</strong> {userContextData.user.phone || 'N/A'}</p>
              <Button onClick={handleEditToggle} className="bg-green-500 text-white">Edit</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
