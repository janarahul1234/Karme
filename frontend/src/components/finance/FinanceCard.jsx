import { useState } from "react";
import { Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { format as formatDate } from "date-fns";

import useToast from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { toCapitalize, formatAmount } from "@/utils/helper";
import { TransactionTypes } from "@/constants";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DeleteFinanceDialog from "@/components/finance/DeleteFinanceDialog";
import useTransactionStore from "@/stores/transactionStore";

const FinanceCard = ({ transaction = {} }) => {
  const { type, category, amount, date, description } = transaction;
  const { deleteTransaction } = useTransactionStore();
  const [deleteFinanceOpen, setDeleteFinanceOpen] = useState(false);

  const toast = useToast();

  const handleDeleteFinance = () => {
    setDeleteFinanceOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setDeleteFinanceOpen(false);
    toast.success("Transaction deleted successfully");
  };

  const isIncome = type === TransactionTypes.INCOME;
  const isSaving = type === "saving";

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between gap-5">
          <div
            className={cn(
              "size-11 bg-primary/10 grid place-items-center rounded-full",
              isIncome
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {isIncome ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
          <div className="grow flex items-center justify-between">
            <div>
              <p className="font-semibold">
                {description ? description : toCapitalize(category)}
              </p>
              <p className="text-muted-foreground text-sm">
                {toCapitalize(category)}
              </p>
            </div>
            <div className="text-right">
              <p
                className={cn(
                  "text-xl font-semibold",
                  isIncome ? "text-primary" : "text-destructive"
                )}
              >
                {isIncome ? "+" : "-"}
                {formatAmount(amount)}
              </p>
              <p className="text-muted-foreground text-sm">
                {formatDate(date, "d MMM, yyyy")}
              </p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-destructive p-5"
            onClick={handleDeleteFinance}
            disabled={isSaving}
          >
            <Trash2 className="size-5 opacity-100" />
          </Button>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <DeleteFinanceDialog
        open={deleteFinanceOpen}
        onOpenChange={setDeleteFinanceOpen}
        transaction={transaction}
        onDelete={handleDelete}
      />
    </>
  );
};

export default FinanceCard;
