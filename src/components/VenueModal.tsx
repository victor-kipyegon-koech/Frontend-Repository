// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Venue } from "@/types";

// interface VenueModalProps {
//   open: boolean;
//   onClose: () => void;
//   initialData?: Partial<Venue>;
//   onSubmit: (data: Partial<Venue>) => void;
//    readOnly?: boolean;
// }

// export const VenueModal: React.FC<VenueModalProps> = ({ open, onClose, initialData, onSubmit }) => {
//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     capacity: "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setForm({
//         name: initialData.name || "",
//         address: initialData.address || "",
//         capacity: initialData.capacity?.toString() || "",
//       });
//     }
//   }, [initialData]);

//   const handleSave = () => {
//     if (!form.name || !form.address || !form.capacity) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     onSubmit({
//       name: form.name,
//       address: form.address,
//       capacity: parseInt(form.capacity),
//     });

//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
//         <DialogHeader>
//           <DialogTitle>{initialData ? "Edit Venue" : "Add Venue"}</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div>
//             <Label>Name</Label>
//             <Input
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               placeholder="Venue name"
//             />
//           </div>
//           <div>
//             <Label>Address</Label>
//             <Input
//               value={form.address}
//               onChange={(e) => setForm({ ...form, address: e.target.value })}
//               placeholder="Physical address"
//             />
//           </div>
//           <div>
//             <Label>Capacity</Label>
//             <Input
//               type="number"
//               min={0}
//               value={form.capacity}
//               onChange={(e) => setForm({ ...form, capacity: e.target.value })}
//               placeholder="e.g. 1000"
//             />
//           </div>

//           <div className="flex justify-end pt-4">
//             <Button onClick={handleSave} className="bg-purple-600 text-white hover:bg-purple-700">
//               Save
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Venue } from "@/types";

interface VenueModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<Venue>;
  onSubmit: (data: Partial<Venue>) => void;
  readOnly?: boolean;
}

export const VenueModal: React.FC<VenueModalProps> = ({
  open,
  onClose,
  initialData,
  onSubmit,
  readOnly = false,
}) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    capacity: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        address: initialData.address || "",
        capacity: initialData.capacity?.toString() || "",
      });
    } else {
      setForm({ name: "", address: "", capacity: "" });
    }
  }, [initialData]);

  const handleSave = () => {
    if (!form.name || !form.address || !form.capacity) {
      toast.error("Please fill in all fields");
      return;
    }

    onSubmit({
      name: form.name,
      address: form.address,
      capacity: parseInt(form.capacity),
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle>
            {readOnly
              ? "Venue Details"
              : initialData
              ? "Edit Venue"
              : "Add Venue"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Venue name"
              disabled={readOnly}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Physical address"
              disabled={readOnly}
            />
          </div>
          <div>
            <Label>Capacity</Label>
            <Input
              type="number"
              min={0}
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              placeholder="e.g. 1000"
              disabled={readOnly}
            />
          </div>

          {!readOnly && (
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSave}
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
