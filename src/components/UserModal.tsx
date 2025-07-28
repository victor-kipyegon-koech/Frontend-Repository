//  import React, { useEffect, useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';

// interface User {
//   userId?: number;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   contactPhone?: string;
//   userType?: string;
// }

// interface UserModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (userData: Partial<User>) => void;
//   initialData?: Partial<User>;
//   readOnly?: boolean;
// }

// export const UserModal: React.FC<UserModalProps> = ({
//   open,
//   onClose,
//   onSubmit,
//   initialData = {},
//   readOnly = false,
// }) => {
//   const [formData, setFormData] = useState<Partial<User>>(initialData);

//   useEffect(() => {
//     setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (field: keyof User, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
//         <DialogHeader>
//           <DialogTitle>{readOnly ? 'View User' : initialData?.userId ? 'Edit User' : 'Add New User'}</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="firstName">First Name</Label>
//             <Input
//               id="firstName"
//               value={formData.firstName || ''}
//               onChange={(e) => handleChange('firstName', e.target.value)}
//               disabled={readOnly}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="lastName">Last Name</Label>
//             <Input
//               id="lastName"
//               value={formData.lastName || ''}
//               onChange={(e) => handleChange('lastName', e.target.value)}
//               disabled={readOnly}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={formData.email || ''}
//               onChange={(e) => handleChange('email', e.target.value)}
//               disabled={readOnly}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="contactPhone">Phone</Label>
//             <Input
//               id="contactPhone"
//               value={formData.contactPhone || ''}
//               onChange={(e) => handleChange('contactPhone', e.target.value)}
//               disabled={readOnly}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="userType">User Type</Label>
//             <select
//               id="userType"
//               className="w-full p-2 border rounded bg-white dark:bg-gray-800"
//               value={formData.userType || ''}
//               onChange={(e) => handleChange('userType', e.target.value)}
//               disabled={readOnly}
//               required
//             >
//               <option value="">Select type</option>
//               <option value="member">Member</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {!readOnly && (
//             <div className="flex justify-end space-x-2 pt-2">
//               <Button type="button" variant="outline" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
//                 Save
//               </Button>
//             </div>
//           )}
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface User {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  contactPhone?: string;
  userType?: string;
}

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: Partial<User>) => void;
  initialData?: Partial<User>;
  readOnly?: boolean;
}

export const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData = {},
  readOnly = false,
}) => {
  const [formData, setFormData] = useState<Partial<User>>(initialData);

  // ✅ Fix: Only update formData if initialData actually changed
  useEffect(() => {
    if (open) {
      setFormData((prev) => {
        const hasChanged = JSON.stringify(prev) !== JSON.stringify(initialData);
        return hasChanged ? initialData : prev;
      });
    }
  }, [open, initialData]);

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle>{readOnly ? 'View User' : initialData?.userId ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
              disabled={readOnly}
              required
            />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
              disabled={readOnly}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={readOnly}
              required
            />
          </div>

          <div>
            <Label htmlFor="contactPhone">Phone</Label>
            <Input
              id="contactPhone"
              value={formData.contactPhone || ''}
              onChange={(e) => handleChange('contactPhone', e.target.value)}
              disabled={readOnly}
              required
            />
          </div>

          <div>
            <Label htmlFor="userType">User Type</Label>
            <select
              id="userType"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800"
              value={formData.userType || ''}
              onChange={(e) => handleChange('userType', e.target.value)}
              disabled={readOnly}
              required
            >
              <option value="" disabled>Select type</option>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {!readOnly && (
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Save
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
