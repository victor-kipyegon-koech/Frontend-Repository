// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Event } from "@/types";

// interface ViewEventModalProps {
//   open: boolean;
//   onClose: () => void;
//   event?: Event;
// }

// export const ViewEventModal: React.FC<ViewEventModalProps> = ({ open, onClose, event }) => {
//   if (!event) return null;

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold">Event Details</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <div>
//             <Label className="text-sm">Title:</Label>
//             <p className="text-base font-medium">{event.title}</p>
//           </div>
//           <div>
//             <Label className="text-sm">Location:</Label>
//             <p className="text-base font-medium">{event.location}</p>
//           </div>
//           <div>
//             <Label className="text-sm">Date:</Label>
//             <p className="text-base font-medium">
//               {new Date(event.date).toLocaleDateString()}
//             </p>
//           </div>
//           <div>
//             <Label className="text-sm">Ticket Price:</Label>
//             <p className="text-base font-medium">${event.ticketPrice.toFixed(2)}</p>
//           </div>
//           <div>
//             <Label className="text-sm">Created At:</Label>
//             <p className="text-base font-medium">
//               {new Date(event.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Event } from "@/types";

interface ViewEventModalProps {
  open: boolean;
  onClose: () => void;
  event?: Event;
}

export const ViewEventModal: React.FC<ViewEventModalProps> = ({ open, onClose, event }) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Event Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm">Title:</Label>
            <p className="text-base font-medium">{event.title}</p>
          </div>
          <div>
            <Label className="text-sm">Location:</Label>
            <p className="text-base font-medium">{event.address || "Not specified"}</p>
          </div>
          <div>
            <Label className="text-sm">Date:</Label>
            <p className="text-base font-medium">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <Label className="text-sm">Ticket Price:</Label>
            <p className="text-base font-medium">
              ${Number(event.ticketPrice).toFixed(2)}
            </p>
          </div>
          <div>
            <Label className="text-sm">Created At:</Label>
            <p className="text-base font-medium">
              {new Date(event.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
