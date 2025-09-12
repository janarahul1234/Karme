import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DeleteFinanceDialog = ({ open, onOpenChange, transaction = {} }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 flex flex-col gap-0 [&>button:last-child]:top-3.5 overflow-y-visible">
        <DialogHeader className="contents text-left space-y-0">
          <DialogTitle className="text-base text-destructive px-6 py-4 flex items-center gap-2 border-b">
            <Trash2 size={20} /> Delete Transaction
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* Dialog content */}
        <div className="px-6 py-4 overflow-y-auto">{/* code */}</div>

        <DialogFooter className="px-6 py-4 border-t">
          <DialogClose asChild>
            <Button size="lg" variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button size="lg" variant="destructive" className="w-full">
            <Trash2 size={20} /> Delete Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFinanceDialog;
