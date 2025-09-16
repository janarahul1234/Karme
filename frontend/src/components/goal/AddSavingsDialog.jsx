import { IndianRupee, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { formatAmount } from "@/utils/helper";

import { Input } from "@/components/ui/input";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const addSavingsSchema = (remaining) =>
  z.object({
    amount: z.coerce
      .number()
      .positive("Savings amount must be greater than 0.")
      .max(remaining, `You can only save up to ${remaining}.`),
  });

const AddSavingsDialog = ({ open, onOpenChange, goal = {}, onAddSaving }) => {
  const { _id, name, targetAmount, savedAmount, progress } = goal;
  const remaining = targetAmount - savedAmount;

  const form = useForm({
    resolver: zodResolver(addSavingsSchema(remaining)),
    values: { amount: "" },
  });

  const handleCancel = () => {
    form.reset();
  };

  const onFormSubmit = (data) => {
    return onAddSaving({ id: _id, data, reset: form.reset });
  };

  const savingsAmount = form.watch("amount");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 flex flex-col gap-0 [&>button:last-child]:top-3.5 overflow-y-visible">
        <DialogHeader className="contents text-left space-y-0">
          <DialogTitle className="text-primary text-base px-6 py-4 flex items-center gap-1 border-b">
            <IndianRupee size={20} />
            Add Savings to {name}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="px-6 py-4 overflow-y-auto">
          <div className="bg-muted/60 mb-4 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Progress</span>
              <span className="font-semibold">{progress.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Saved</span>
              <span className="font-semibold text-primary">
                {formatAmount(savedAmount)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-semibold text-destructive">
                {formatAmount(remaining)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Goal</span>
              <span className="font-semibold">
                {formatAmount(targetAmount)}
              </span>
            </div>
          </div>

          <Form {...form}>
            <form id="goal-form" onSubmit={form.handleSubmit(onFormSubmit)}>
              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Amount to Add</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        variant="lg"
                        placeholder="1000"
                        min="1"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum: {formatAmount(remaining)}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <DialogClose asChild>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            form="goal-form"
            size="lg"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin size-5" />
                Adding...
              </>
            ) : (
              <>
                Add{" "}
                {savingsAmount ? formatAmount(Number(savingsAmount)) : "Saving"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSavingsDialog;
