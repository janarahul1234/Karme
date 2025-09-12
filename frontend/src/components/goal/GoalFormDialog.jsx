import { CalendarIcon, LoaderCircle, X } from "lucide-react";
import { formatDate } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { GoalCategories, AvailableGoalCategories } from "@/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const goalSchema = z
  .object({
    goalName: z.string().nonempty("Please give your goal a name."),
    category: z.enum(AvailableGoalCategories, {
      errorMap: () => ({
        message: "Pick a category that best fits your goal.",
      }),
    }),
    targetAmount: z.coerce
      .number()
      .positive("Goal amount must be greater than 0."),
    savedAmount: z.coerce
      .number()
      .nonnegative("Current savings cannot be negative.")
      .default(0),
    targetDate: z
      .string()
      .nonempty({ message: "Choose a date you want to reach this goal by." })
      .refine((val) => new Date(val) >= new Date(), {
        message: "The target date must be in the future.",
      }),
    imageUrl: z
      .string()
      .url("Please enter a valid link for the image.")
      .refine(
        (val) => val.startsWith("http://") || val.startsWith("https://"),
        { message: "Image link must start with http:// or https://." }
      ),
  })
  .refine((data) => data.savedAmount <= data.targetAmount, {
    message:
      "Your current savings must be less than or equal to your goal amount.",
    path: ["savedAmount"],
  });

const CategoryOptions = [
  { label: "Electronics", value: GoalCategories.ELECTRONICS },
  { label: "Travel", value: GoalCategories.TRAVEL },
  { label: "Education", value: GoalCategories.EDUCATION },
  { label: "Fashion", value: GoalCategories.FASHION },
  { label: "Event", value: GoalCategories.EVENT },
  { label: "Vehicle", value: GoalCategories.VEHICLE },
  { label: "Other", value: GoalCategories.OTHER },
];

const GoalFormDialog = ({ open, onOpenChange, goal = {}, onSubmit }) => {
  const {
    _id,
    name,
    category,
    targetAmount,
    savedAmount,
    targetDate,
    imageUrl,
  } = goal;

  const form = useForm({
    resolver: zodResolver(goalSchema),
    values: {
      goalName: name ?? "",
      category: category ?? GoalCategories.ELECTRONICS,
      targetAmount: targetAmount ?? "",
      savedAmount: savedAmount ?? "",
      targetDate: targetDate ?? "",
      imageUrl: imageUrl ?? "",
    },
  });

  const handleCancel = () => {
    form.reset();
  };

  const onFormSubmit = (data) => {
    return onSubmit({ id: _id, data, reset: form.reset });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 flex flex-col gap-0 [&>button:last-child]:top-3.5 overflow-y-visible">
        <DialogHeader className="contents text-left space-y-0">
          <DialogTitle className="text-base px-6 py-4 border-b">
            {_id ? "Edit Goal" : "Add Goal"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* Dialog content */}
        <div className="px-6 py-4 overflow-y-auto">
          <Form {...form}>
            <form
              id="goal-form"
              className="grid gap-4"
              onSubmit={form.handleSubmit(onFormSubmit)}
            >
              {/* Goal name */}
              <FormField
                control={form.control}
                name="goalName"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Goal Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        variant="lg"
                        placeholder="e.g., MacBook Pro"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="targetAmount"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        variant="lg"
                        placeholder="5000"
                        min="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger size="lg" className="cursor-pointer">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CategoryOptions.map(({ label, value }) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="cursor-pointer"
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Target date */}
              <FormField
                control={form.control}
                name="targetDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="relative">
                            <Button
                              type="button"
                              size="lg"
                              variant="outline"
                              mode="input"
                              placeholder={!field.value}
                              className="w-full gap-3 shadow-xs shadow-black/5"
                            >
                              <CalendarIcon className="size-5" />
                              {field.value ? (
                                formatDate(new Date(field.value), "d MMM, yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                            {field.value && (
                              <Button
                                type="button"
                                variant="dim"
                                size="sm"
                                className="px-3.5 absolute top-1/2 -end-0 -translate-y-1/2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  form.setValue("targetDate", "", {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                <X />
                              </Button>
                            )}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              form.setValue(
                                "targetDate",
                                date?.toISOString() || "",
                                { shouldValidate: true }
                              )
                            }
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Current savings */}
              <FormField
                control={form.control}
                name="savedAmount"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Current Savings</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        variant="lg"
                        placeholder="1000"
                        min="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Url */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        variant="lg"
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="w-full"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="goal-form"
            size="lg"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin size-5" />
                {_id ? "Updating..." : "Creating..."}
              </>
            ) : _id ? (
              "Update Goal"
            ) : (
              "Create Goal"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GoalFormDialog;
