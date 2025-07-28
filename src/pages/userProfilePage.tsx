 
//  import React, { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { useAuth } from '@/context/AuthContext';

// export const UserProfilePage: React.FC = () => {
//   const { user, updateProfile, changePassword } = useAuth();

//   const [formData, setFormData] = useState({
//     firstName: user?.firstName || '',
//     lastName: user?.lastName || '',
//     email: user?.email || '',
//     profileImage: user?.profileImage || '',
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const [uploading, setUploading] = useState(false);

//   const uploadToCloudinary = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // from Cloudinary
//     const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
//       method: 'POST',
//       body: formData,
//     });
//     const data = await res.json();
//     return data.secure_url;
//   };

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setUploading(true);
//       const url = await uploadToCloudinary(file);
//       setFormData((prev) => ({ ...prev, profileImage: url }));
//       toast.success('Image uploaded');
//     } catch (err) {
//       toast.error('Failed to upload image');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       await updateProfile(formData);
//       toast.success('Profile updated!');
//     } catch {
//       toast.error('Failed to update profile');
//     }
//   };

//   const handleChangePassword = async () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       await changePassword(passwordData.currentPassword, passwordData.newPassword);
//       toast.success('Password changed!');
//       setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//     } catch {
//       toast.error('Failed to change password');
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto py-8 px-4">
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Update Profile</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <label className="font-medium">Profile Image</label>
//             {formData.profileImage && (
//               <img
//                 src={formData.profileImage}
//                 alt="Profile"
//                 className="h-24 w-24 object-cover rounded-full"
//               />
//             )}
//             <Input type="file" accept="image/*" onChange={handleImageChange} />
//             {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
//           </div>
//           <Input
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//           />
//           <Input
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//           />
//           <Input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           />
//           <Button onClick={handleUpdateProfile} disabled={uploading}>
//             Save Changes
//           </Button>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Change Password</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Input
//             type="password"
//             placeholder="Current Password"
//             value={passwordData.currentPassword}
//             onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//           />
//           <Input
//             type="password"
//             placeholder="New Password"
//             value={passwordData.newPassword}
//             onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//           />
//           <Input
//             type="password"
//             placeholder="Confirm New Password"
//             value={passwordData.confirmPassword}
//             onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//           />
//           <Button onClick={handleChangePassword}>Change Password</Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };


 import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Camera } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { user, updateProfile, changePassword } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    avatar_url: user?.avatarUrl || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // replace this
    const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    return data.secure_url;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, avatar_url: url }));
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(formData);
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      toast.success('Password changed!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      toast.error('Failed to change password');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile Image Upload */}
          <div>
            <Label className="block mb-1">Profile Image</Label>
            <div className="relative w-24 h-24">
              <img
                src={formData.avatar_url || '/default-avatar.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <label
                htmlFor="avatarUpload"
                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/60 transition"
              >
                <Camera className="text-white w-6 h-6" />
              </label>
              <Input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
          </div>

          {/* Editable fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Button onClick={handleUpdateProfile} disabled={uploading}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="password"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
          />
          <Input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
          />
          <Button onClick={handleChangePassword}>Change Password</Button>
        </CardContent>
      </Card>
    </div>
  );
};

