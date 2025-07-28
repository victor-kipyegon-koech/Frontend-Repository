 
// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { toast } from 'sonner';
// import { Eye, Edit, Trash2, UserPlus, Search, Mail, Phone, Calendar } from 'lucide-react';
// import { getAllUsers, createUser, updateUser, deleteUser, getUserById } from '@/services/UserService';
// import { UserModal } from '@/components/UserModal';

// interface User {
//   userId: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   contactPhone: string;
//   userType: string;
//   createdAt: string | Date;
//   totalBookings?: number;
//   totalSpent?: number;
// }

// export const AdminUsersPage: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [readOnly, setReadOnly] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const data = await getAllUsers();
//       setUsers(data);
//     })();
//   }, []);

//   const filteredUsers = users.filter(user =>
//     user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAdd = () => {
//     setSelectedUser(null);
//     setReadOnly(false);
//     setModalOpen(true);
//   };

//   const handleView = async (id: number) => {
//     const user = await getUserById(id);
//     setSelectedUser(user);
//     setReadOnly(true);
//     setModalOpen(true);
//   };

//   const handleEdit = async (id: number) => {
//     const user = await getUserById(id);
//     setSelectedUser(user);
//     setReadOnly(false);
//     setModalOpen(true);
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm('Are you sure you want to delete this user?')) return;
//     await deleteUser(id);
//     setUsers(prev => prev.filter(u => u.userId !== id));
//     toast.success('User deleted');
//   };

//   const handleSubmit = async (data: Partial<User>) => {
//     try {
//       if (selectedUser && selectedUser.userId) {
//         const updated = await updateUser(selectedUser.userId, data);
//         setUsers(prev => prev.map(u => u.userId === updated.userId ? updated : u));
//         toast.success('User updated');
//       } else {
//         const created = await createUser({ ...data, password: 'default123', address: 'Nairobi' });
//         setUsers(prev => [...prev, created]);
//         toast.success('User added');
//       }
//       setModalOpen(false);
//     } catch (err) {
//       toast.error('Failed to save user');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Manage Users</h1>
//         <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
//           <UserPlus className="w-4 h-4 mr-2" /> Add User
//         </Button>
//       </div>

//       <div className="flex mb-6">
//         <div className="relative w-full max-w-md">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//           <Input
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 bg-gray-800 border-gray-700 text-white"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredUsers.map(user => (
//           <Card key={user.userId} className="bg-gray-800 border border-gray-700">
//             <CardHeader>
//               <div className="flex justify-between items-start">
//                 <CardTitle>{user.firstName} {user.lastName}</CardTitle>
//                 <Badge variant="outline" className={user.userType === 'admin' ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'}>
//                   {user.userType}
//                 </Badge>
//               </div>
//             </CardHeader>
//             <CardContent className="text-sm text-gray-300 space-y-2">
//               <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {user.email}</div>
//               <div className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {user.contactPhone}</div>
//               <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(user.createdAt).toLocaleDateString()}</div>
//               <div className="bg-gray-700 p-2 rounded mt-2">
//                 <div className="flex justify-between text-sm">
//                   <span>Bookings:</span>
//                   <span>{user.totalBookings ?? 0}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span>Total Spent:</span>
//                   <span className="text-green-400">${(user.totalSpent ?? 0).toFixed(2)}</span>
//                 </div>
//               </div>
//               <div className="flex justify-between gap-2 pt-2">
//                 <Button onClick={() => handleView(user.userId)} size="sm" variant="outline" className="flex-1">
//                   <Eye className="w-4 h-4 mr-1" /> View
//                 </Button>
//                 <Button onClick={() => handleEdit(user.userId)} size="sm" variant="outline" className="flex-1">
//                   <Edit className="w-4 h-4 mr-1" /> Edit
//                 </Button>
//                 <Button onClick={() => handleDelete(user.userId)} size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
//                   <Trash2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Add/Edit Modal */}
//       <UserModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleSubmit}
//         initialData={selectedUser || undefined}
//         readOnly={readOnly}
//       />
//     </div>
//   );
// };

// export default AdminUsersPage;
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Eye, Edit, Trash2, UserPlus, Search, Mail, Phone, Calendar } from 'lucide-react';

import { getAllUsers, createUser, updateUser, deleteUser, getUserById } from '@/services/UserService';
import { UserModal } from '@/components/UserModal';
import { ConfirmModal } from '@/components/ConfirmModal';

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  contactPhone: string;
  userType: string;
  createdAt: string | Date;
  totalBookings?: number;
  totalSpent?: number;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getAllUsers();
      setUsers(data);
    })();
  }, []);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedUser(null);
    setReadOnly(false);
    setModalOpen(true);
  };

  const handleView = async (id: number) => {
    const user = await getUserById(id);
    setSelectedUser(user);
    setReadOnly(true);
    setModalOpen(true);
  };

  const handleEdit = async (id: number) => {
    const user = await getUserById(id);
    setSelectedUser(user);
    setReadOnly(false);
    setModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.userId);
      setUsers(prev => prev.filter(u => u.userId !== userToDelete.userId));
      toast.success('User deleted');
    } catch (err) {
      toast.error('Failed to delete user');
    } finally {
      setConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSubmit = async (data: Partial<User>) => {
    try {
      if (selectedUser && selectedUser.userId) {
        const updated = await updateUser(selectedUser.userId, data);
        setUsers(prev => prev.map(u => u.userId === updated.userId ? updated : u));
        toast.success('User updated');
      } else {
        const created = await createUser({ ...data, password: 'default123', address: 'Nairobi' });
        setUsers(prev => [...prev, created]);
        toast.success('User added');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error('Failed to save user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
          <UserPlus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      <div className="flex mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <Card key={user.userId} className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                <Badge variant="outline" className={user.userType === 'admin' ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'}>
                  {user.userType}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 space-y-2">
              <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {user.email}</div>
              <div className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {user.contactPhone}</div>
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(user.createdAt).toLocaleDateString()}</div>
              <div className="bg-gray-700 p-2 rounded mt-2">
                <div className="flex justify-between text-sm">
                  <span>Bookings:</span>
                  <span>{user.totalBookings ?? 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Spent:</span>
                  <span className="text-green-400">${(user.totalSpent ?? 0).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between gap-2 pt-2">
                <Button onClick={() => handleView(user.userId)} size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" /> View
                </Button>
                <Button onClick={() => handleEdit(user.userId)} size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button onClick={() => handleDelete(user)} size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <UserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedUser || undefined}
        readOnly={readOnly}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User?"
        message={`Are you sure you want to delete ${userToDelete?.firstName} ${userToDelete?.lastName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminUsersPage;

 