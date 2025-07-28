 
// import { useState } from "react";
// import {
//   Dialog,
//   DialogHeader,
//   DialogTitle,
//   DialogContent,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useEvents } from "@/hooks/useApi";

// export const AddUserEventModal = ({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) => {
//   const { createEvent } = useEvents();
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     date: "",
//     time: "",
//     ticketPrice: "",
//     venueId: "",
//     category: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const isValid = () =>
//     formData.title &&
//     formData.description &&
//     formData.date &&
//     formData.time &&
//     formData.ticketPrice &&
//     formData.venueId;

//   const handleSubmit = async () => {
//     if (!isValid()) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createEvent({
//         ...formData,
//         ticketPrice: parseFloat(formData.ticketPrice),
//         venueId: parseInt(formData.venueId),
//       } as any);
//       toast.success("🎉 Event created successfully");
//       onClose();
//       setFormData({
//         title: "",
//         description: "",
//         date: "",
//         time: "",
//         ticketPrice: "",
//         venueId: "",
//         category: "",
//       });
//     } catch (error) {
//       toast.error("Failed to create event");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold">
//             Create New Event
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           {/* Title */}
//           <div>
//             <Label>Title</Label>
//             <Input
//               placeholder="Event title"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <Label>Description</Label>
//             <Input
//               placeholder="Short event description"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//             />
//           </div>

//           {/* Date & Time */}
//           <div className="flex space-x-2">
//             <div className="flex-1">
//               <Label>Date</Label>
//               <Input
//                 type="date"
//                 value={formData.date}
//                 onChange={(e) =>
//                   setFormData({ ...formData, date: e.target.value })
//                 }
//               />
//             </div>
//             <div className="flex-1">
//               <Label>Time</Label>
//               <Input
//                 type="time"
//                 value={formData.time}
//                 onChange={(e) =>
//                   setFormData({ ...formData, time: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           {/* Ticket Price */}
//           <div>
//             <Label>Ticket Price (KSh)</Label>
//             <Input
//               type="number"
//               min={0}
//               value={formData.ticketPrice}
//               onChange={(e) =>
//                 setFormData({ ...formData, ticketPrice: e.target.value })
//               }
//             />
//           </div>

//           {/* Venue */}
//           <div>
//             <Label>Venue ID</Label>
//             <Input
//               placeholder="Enter venue ID"
//               value={formData.venueId}
//               onChange={(e) =>
//                 setFormData({ ...formData, venueId: e.target.value })
//               }
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <Label>Category</Label>
//             <Input
//               placeholder="e.g. music, tech, business"
//               value={formData.category}
//               onChange={(e) =>
//                 setFormData({ ...formData, category: e.target.value })
//               }
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end mt-6">
//             <Button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-purple-600 text-white hover:bg-purple-700"
//             >
//               {loading ? "Submitting..." : "Submit"}
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
import { Event } from "@/types";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<Event>;
  onSubmit: (data: Partial<Event>) => void;
  readOnly?: boolean;
}

export const EventModal: React.FC<EventModalProps> = ({
  open,
  onClose,
  initialData,
  onSubmit,
  readOnly = false,
}) => {
  const [form, setForm] = useState({
    title: "",
    address: "",
    date: "",
    ticketPrice: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        address: initialData.address || "",
        date: initialData.date ? initialData.date.split("T")[0] : "",
        ticketPrice: initialData.ticketPrice?.toString() || "",
      });
    } else {
      setForm({ title: "", address: "", date: "", ticketPrice: "" });
    }
  }, [initialData]);

  const handleSave = () => {
    const { title, address, date, ticketPrice } = form;

    if (!title || !address || !date || !ticketPrice) {
      toast.error("Please fill in all fields");
      return;
    }

    onSubmit({
      title,
      address,
      date,
      ticketPrice: parseFloat(ticketPrice),
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle>
            {readOnly
              ? "Event Details"
              : initialData
              ? "Edit Event"
              : "Add Event"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Event title"
              disabled={readOnly}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Event address"
              disabled={readOnly}
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              disabled={readOnly}
            />
          </div>
          <div>
            <Label>Ticket Price</Label>
            <Input
              type="number"
              min={0}
              value={form.ticketPrice}
              onChange={(e) =>
                setForm({ ...form, ticketPrice: e.target.value })
              }
              placeholder="e.g. 50.00"
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
