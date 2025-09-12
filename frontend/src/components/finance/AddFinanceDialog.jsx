import { CalendarIcon, X } from "lucide-react";
import { formatDate } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  TransactionTypes,
  AvailableTransactionTypes,
  AvailableIncomeCaregories,
  AvailableExpenseCategories,
} from "@/constants";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const transactionSchema = z
  .object({
    type: z.enum(AvailableTransactionTypes, {
      errorMap: () => ({
        message: "Pick a valid transaction type.",
      }),
    }),
    title: z.string().nonempty("Please provide a transaction title."),
    amount: z.coerce
      .number()
      .positive("Transaction amount must be greater than 0."),
    category: z.string().nonempty("Category is required."),
    date: z
      .string()
      .nonempty("Please choose a transaction date.")
      .refine((val) => new Date(val) <= new Date(), {
        message: "The transaction date cannot be in the future.",
      }),
  })
  .refine(
    (data) => {
      if (data.type === TransactionTypes.INCOME) {
        return AvailableIncomeCaregories.includes(data.category);
      }
      if (data.type === TransactionTypes.EXPENSE) {
        return AvailableExpenseCategories.includes(data.category);
      }
      return false;
    },
    {
      message: "Invalid category for the chosen transaction type.",
      path: ["category"],
    }
  );

const AddFinanceDialog = ({ open, onOpenChange, onAddTransaction }) => {
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    values: {
      type: TransactionTypes.EXPENSE,
      title: "",
      amount: "",
      category: "",
      date: "",
    },
  });

  const handelTypesChange = (value) => {
    return () => {
      form.setValue("type", value, {
        shouldValidate: true,
      });
    };
  };

  const onSubmit = (data) => {
    return onAddTransaction({ data, reset: form.reset });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 flex flex-col gap-0 [&>button:last-child]:top-3.5 overflow-y-visible">
        <DialogHeader className="contents text-left space-y-0">
          <DialogTitle className="text-base px-6 py-4 border-b">
            Add Transaction
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* Dialog content */}
        <div className="px-6 py-4 overflow-y-auto">
          {/* Form */}
          <Form {...form}>
            <form
              id="transaction-form"
              className="grid gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label>Type</Label>
                    <Tabs defaultValue={field.value}>
                      <TabsList
                        variant="button"
                        className="w-full grid grid-cols-2"
                      >
                        <TabsTrigger
                          value="income"
                          className="bg-muted hover:bg-border/80 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                          onClick={handelTypesChange(TransactionTypes.INCOME)}
                        >
                          Income
                        </TabsTrigger>
                        <TabsTrigger
                          value="expense"
                          className="bg-muted hover:bg-border/80 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500"
                          onClick={handelTypesChange(TransactionTypes.EXPENSE)}
                        >
                          Expense
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                )}
              />

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        variant="lg"
                        type="text"
                        placeholder="Enter your title"
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
                name="amount"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        variant="lg"
                        type="number"
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
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {form.watch("type") === TransactionTypes.INCOME &&
                            AvailableIncomeCaregories.map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          {form.watch("type") === TransactionTypes.EXPENSE &&
                            AvailableExpenseCategories.map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="relative">
                            <Button
                              size="lg"
                              variant="outline"
                              mode="input"
                              type="button"
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
                                size="lg"
                                className="absolute top-1/2 -end-0 -translate-y-1/2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  form.setValue("date", "", {
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
                              form.setValue("date", date?.toISOString() || "", {
                                shouldValidate: true,
                              })
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
            </form>
          </Form>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <DialogClose asChild>
            <Button size="lg" variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button size="lg" form="transaction-form" className="w-full">
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFinanceDialog;
