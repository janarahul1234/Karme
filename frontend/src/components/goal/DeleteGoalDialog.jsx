import { AlertTriangle, Trash2 } from "lucide-react";

import { formatAmount } from "@/utils/helper";

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
import { Alert, AlertDescription, AlertIcon } from "@/components/ui/alert";

const DeleteGoalDialog = ({ open, onOpenChange, goal = {}, onDelete }) => {
  const { _id, name, category, targetAmount, savedAmount, progress } = goal;

  const handleDelete = () => {
    onDelete(_id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 flex flex-col gap-0 [&>button:last-child]:top-3.5 overflow-y-visible">
        <DialogHeader className="contents text-left space-y-0">
          <DialogTitle className="text-destructive text-base px-6 py-4 flex items-center gap-2 border-b">
            <Trash2 size={20} /> Delete Goal
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="px-6 py-4 overflow-y-auto">
          <Alert className="bg-destructive/5 text-destructive border-destructive/20 mb-4">
            <AlertIcon>
              <AlertTriangle />
            </AlertIcon>
            <AlertDescription>
              This action cannot be undone. This will permanently delete your
              goal and all associated savings data.
            </AlertDescription>
          </Alert>

          <div className="bg-muted/50 mb-4 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{name}</h3>
            <div className="text-muted-foreground text-sm space-y-1">
              <div>
                Category: <span className="capitalize">{category}</span>
              </div>
              <div>Amount: {formatAmount(targetAmount)}</div>
              <div>Saved: {formatAmount(savedAmount)}</div>
              <div>Progress: {progress.toFixed(1)}%</div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete "{name}"? All your savings progress
            for this goal will be lost.
          </p>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <DialogClose asChild>
            <Button size="lg" variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="lg"
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
          >
            <Trash2 className="size-5" /> Delete Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGoalDialog;
