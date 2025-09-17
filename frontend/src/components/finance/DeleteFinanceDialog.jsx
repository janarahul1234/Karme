import { AlertTriangle, Trash2 } from "lucide-react";

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
import { format } from "date-fns";
import { formatAmount, toCapitalize } from "@/utils/helper";
import { Alert, AlertDescription, AlertIcon } from "../ui/alert";

const DeleteFinanceDialog = ({
  open,
  onOpenChange,
  transaction = {},
  onDelete,
}) => {
  const { _id, category, amount, date, description } = transaction;

  const handleDelete = () => {
    onDelete(_id);
  };

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
        <div className="px-6 py-4 overflow-y-auto">
          <Alert className="bg-destructive/5 text-destructive border-destructive/20 mb-4">
            <AlertIcon>
              <AlertTriangle />
            </AlertIcon>
            <AlertDescription>
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </AlertDescription>
          </Alert>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">
              {description ? description : toCapitalize(category)}
            </h3>
            <div className="text-muted-foreground text-sm space-y-1">
              <div>Amount: {formatAmount(amount)}</div>
              <div>Category: {toCapitalize(category)}</div>
              <div>
                Date: {date ? format(new Date(date), "d MMM, yyyy") : "-"}
              </div>
            </div>
          </div>
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
            <Trash2 size={20} /> Delete Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFinanceDialog;
