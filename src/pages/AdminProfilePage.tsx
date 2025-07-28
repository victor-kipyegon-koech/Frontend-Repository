 
// import React, { useRef, useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { Camera,  } from 'lucide-react';

// export const AdminProfilePage: React.FC = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { user, updateUser } = useAuth();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     avatarUrl: '',
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         email: user.email || '',
//         avatarUrl: user.avatarUrl || '',
//       });
//     }
//   }, [user]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !user) return;

//     // ✅ Replace with your Cloudinary config
//     const CLOUDINARY_UPLOAD_PRESET = 'profile-images';
//     const CLOUDINARY_CLOUD_NAME = 'dbkg0qq2t';

//     const form = new FormData();
//     form.append('file', file);
//     form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

//     try {
//       toast.loading('Uploading image...');
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: 'POST',
//           body: form,
//         }
//       );

//       const data = await res.json();
//       if (!data.secure_url) throw new Error('Upload failed');

//       const updatedUser = { ...formData, avatarUrl: data.secure_url };

//       // Update in backend
//       const updateRes = await fetch(`http://localhost:5000/api/users/${user.userId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedUser),
//       });

//       if (!updateRes.ok) throw new Error('Backend update failed');

//       const updated = await updateRes.json();
//       updateUser(updated); // update local context + storage
//       setFormData(prev => ({ ...prev, avatarUrl: data.secure_url }));
//       toast.success('Profile picture updated!');
//     } catch (err) {
//       console.error(err);
//       toast.error('Image upload failed');
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/users/${user?.userId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error('Update failed');

//       const updated = await res.json();
//       updateUser(updated); // update local context + storage
//       toast.success('Profile updated!');
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to update profile.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow space-y-6">
//       <h1 className="text-2xl font-bold text-center">Admin Profile</h1>

//       {/* Profile Image Upload */}
//       <div className="flex justify-center relative">
//         <div className="avatar relative">
//           <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
//             {formData.avatarUrl ? (
//               <img
//                 src={formData.avatarUrl}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
//                 No Image
//               </div>
//             )}
//           </div>
//           <button
//             className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow hover:bg-gray-200 transition"
//             onClick={() => fileInputRef.current?.click()}
//             type="button"
//           >
//             <Camera className="w-4 h-4 text-gray-700" />
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageUpload}
//           />
//         </div>
//       </div>

//       {/* Form Fields */}
//       <div className="grid gap-4">
//         <Input
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           placeholder="First Name"
//         />
//         <Input
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           placeholder="Last Name"
//         />
//         <Input
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           disabled
//         />
//       </div>

//       <div className="text-center">
//         <Button className="w-full sm:w-1/2" onClick={handleSubmit}>
//           Save Changes
//         </Button>
//       </div>
//     </div>
//   );
// };
import React, { useRef, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Camera } from 'lucide-react';

export const AdminProfilePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        avatarUrl: user.avatarUrl || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const CLOUDINARY_UPLOAD_PRESET = 'profile-images';
    const CLOUDINARY_CLOUD_NAME = 'dbkg0qq2t';

    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      toast.loading('Uploading image...');
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: form,
        }
      );

      const data = await res.json();
      if (!data.secure_url) throw new Error('Upload failed');

      const updatedUser = { ...formData, avatarUrl: data.secure_url };

      const updateRes = await fetch(`http://localhost:5000/api/users/${user.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!updateRes.ok) {
        const errorData = await updateRes.json();
        console.error('Backend Error:', errorData);
        throw new Error('Backend update failed');
      }

      const updated = await updateRes.json();
      updateUser(updated);
      setFormData(prev => ({ ...prev, avatarUrl: data.secure_url }));
      toast.success('Profile picture updated!');
    } catch (err) {
      console.error('Image upload error:', err);
      toast.error('Image upload failed');
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user?.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Profile update error:', errorData);
        throw new Error('Update failed');
      }

      const updated = await res.json();
      updateUser(updated);
      toast.success('Profile updated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">Admin Profile</h1>

      {/* Profile Image Upload */}
      <div className="flex justify-center relative">
        <div className="avatar relative">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            {formData.avatarUrl ? (
              <img
                src={formData.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          <button
            className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow hover:bg-gray-200 transition"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            <Camera className="w-4 h-4 text-gray-700" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-4">
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          disabled
        />
      </div>

      <div className="text-center">
        <Button className="w-full sm:w-1/2" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

