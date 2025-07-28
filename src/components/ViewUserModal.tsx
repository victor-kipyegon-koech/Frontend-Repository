// import React from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Mail, Phone, Calendar } from 'lucide-react';

// interface ViewUserModalProps {
//   open: boolean;
//   onClose: () => void;
//   user: {
//     userId?: number;
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     contactPhone?: string;
//     userType?: string;
//     createdAt?: string | Date;
//     totalBookings?: number;
//     totalSpent?: number;
//   } | null;
// }

// export const ViewUserModal: React.FC<ViewUserModalProps> = ({ open, onClose, user }) => {
//   if (!user) return null;

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
//         <DialogHeader>
//           <DialogTitle>User Details</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 text-sm">
//           <div>
//             <span className="font-semibold">Name:</span>{' '}
//             {user.firstName} {user.lastName}
//           </div>
//           <div className="flex items-center gap-2">
//             <Mail className="w-4 h-4 text-gray-400" />
//             <span>{user.email}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Phone className="w-4 h-4 text-gray-400" />
//             <span>{user.contactPhone}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Calendar className="w-4 h-4 text-gray-400" />
//             <span>Joined: {new Date(user.createdAt || '').toLocaleDateString()}</span>
//           </div>
//           <div>
//             <span className="font-semibold">User Type:</span>{' '}
//             <span className={user.userType === 'admin' ? 'text-red-500' : 'text-green-500'}>
//               {user.userType}
//             </span>
//           </div>
//           <div>
//             <span className="font-semibold">Total Bookings:</span>{' '}
//             {user.totalBookings ?? 0}
//           </div>
//           <div>
//             <span className="font-semibold">Total Spent:</span>{' '}
//             ${user.totalSpent?.toFixed(2) ?? '0.00'}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { User } from "@/types";

interface ViewUserModalProps {
  open: boolean;
  onClose: () => void;
  user?: User;
}

export const ViewUserModal: React.FC<ViewUserModalProps> = ({ open, onClose, user }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm">First Name:</Label>
            <p className="text-base font-medium">{user.firstName}</p>
          </div>
          <div>
            <Label className="text-sm">Last Name:</Label>
            <p className="text-base font-medium">{user.lastName}</p>
          </div>
          <div>
            <Label className="text-sm">Email:</Label>
            <p className="text-base font-medium">{user.email}</p>
          </div>
          <div>
            <Label className="text-sm">Phone:</Label>
            <p className="text-base font-medium">{user.contactPhone}</p>
          </div>
          <div>
            <Label className="text-sm">Address:</Label>
            <p className="text-base font-medium">{user.address}</p>
          </div>
          <div>
            <Label className="text-sm">Role:</Label>
            <p className="text-base font-medium capitalize">{user.userType}</p>
          </div>
          <div>
            <Label className="text-sm">Created At:</Label>
            <p className="text-base font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
