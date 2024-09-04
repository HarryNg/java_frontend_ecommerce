import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function EditingForm({ formData, handleChange, handleSave }: any) {
    return (
      <div className="space-y-4">
        {[
          { label: "First Name", name: "firstName", value: formData.firstName },
          { label: "Last Name", name: "lastName", value: formData.lastName },
          { label: "Address", name: "address", value: formData.address },
          { label: "Phone", name: "phoneNumber", value: formData.phoneNumber },
        ].map(({ label, name, value }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <Input
              type="text"
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          </div>
        ))}
        <Button onClick={handleSave} className="bg-blue-500 text-white">
          Save
        </Button>
      </div>
    );
  }


 export function UserDetails({ user, handleEditToggle }: any) {
    return (
      <div>
        {[
          { label: "First Name", value: user.firstName || "N/A" },
          { label: "Last Name", value: user.lastName || "N/A" },
          { label: "Address", value: user.address || "N/A" },
          { label: "Phone", value: user.phoneNumber || "N/A" },
        ].map(({ label, value }) => (
          <p key={label}>
            <strong>{label}:</strong> {value}
          </p>
        ))}
        <Button onClick={handleEditToggle} className="bg-green-500 text-white">
          Edit
        </Button>
      </div>
    );
  }