 
// import React, { useEffect, useState } from 'react';

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   contactPhone: string;
//   userType: string;
// }

// interface UserModalProps {
//   onClose: () => void;
//   onSubmit: (userData: Partial<User>) => void;
//   initialData?: Partial<User>;
// }

// export const UserModal: React.FC<UserModalProps> = ({
//   onClose,
//   onSubmit,
//   initialData = {},
// }) => {
//   const [formData, setFormData] = useState<Partial<User>>(initialData);

//   useEffect(() => {
//     setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.contactPhone ||
//       !formData.userType
//     ) {
//       alert('Please fill in all fields');
//       return;
//     }
//     onSubmit(formData);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
//       <div className="bg-base-100 w-full max-w-xl rounded-xl shadow-2xl border border-gray-700 p-6">
//         <h2 className="text-xl font-bold mb-4 text-white">
//           {initialData?.firstName ? 'Edit User' : 'Add New User'}
//         </h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="label text-sm text-gray-400">First Name</label>
//             <input
//               name="firstName"
//               value={formData.firstName || ''}
//               onChange={handleChange}
//               className="input input-bordered w-full bg-gray-800 text-white"
//               placeholder="First name"
//               required
//             />
//           </div>

//           <div>
//             <label className="label text-sm text-gray-400">Last Name</label>
//             <input
//               name="lastName"
//               value={formData.lastName || ''}
//               onChange={handleChange}
//               className="input input-bordered w-full bg-gray-800 text-white"
//               placeholder="Last name"
//               required
//             />
//           </div>

//           <div>
//             <label className="label text-sm text-gray-400">Email</label>
//             <input
//               name="email"
//               type="email"
//               value={formData.email || ''}
//               onChange={handleChange}
//               className="input input-bordered w-full bg-gray-800 text-white"
//               placeholder="Email"
//               required
//             />
//           </div>

//           <div>
//             <label className="label text-sm text-gray-400">Phone</label>
//             <input
//               name="contactPhone"
//               value={formData.contactPhone || ''}
//               onChange={handleChange}
//               className="input input-bordered w-full bg-gray-800 text-white"
//               placeholder="Phone"
//               required
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="label text-sm text-gray-400">User Type</label>
//             <select
//               name="userType"
//               value={formData.userType || ''}
//               onChange={handleChange}
//               className="select select-bordered w-full bg-gray-800 text-white"
//               required
//             >
//               <option value="">Select user type</option>
//               <option value="member">Member</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <div className="md:col-span-2 flex justify-end gap-3 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="btn btn-outline text-gray-300 border-gray-600 hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-primary bg-green-600 hover:bg-green-700 text-white"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
