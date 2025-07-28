import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Venue } from "@/types";

interface ViewVenueModalProps {
  open: boolean;
  onClose: () => void;
  venue?: Venue;
}

export const ViewVenueModal: React.FC<ViewVenueModalProps> = ({ open, onClose, venue }) => {
  if (!venue) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Venue Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm">Name:</Label>
            <p className="text-base font-medium">{venue.name}</p>
          </div>
          <div>
            <Label className="text-sm">Address:</Label>
            <p className="text-base font-medium">{venue.address}</p>
          </div>
          <div>
            <Label className="text-sm">Capacity:</Label>
            <p className="text-base font-medium">{venue.capacity.toLocaleString()}</p>
          </div>
          <div>
            <Label className="text-sm">Created At:</Label>
            <p className="text-base font-medium">{new Date(venue.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
