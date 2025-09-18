import { useCallback, useEffect, useState } from "react";
import {
  ArrowDownUp,
  Calendar,
  LoaderCircle,
  Plus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import useTransactionStore from "@/stores/transactionStore";
import useToast from "@/hooks/useToast";

import { formatAmount, toCapitalize } from "@/utils/helper";

import { getFinances } from "@/apis/finances";
import { getTransactions } from "@/apis/transaction";

import { TransactionSortTypes, AvailableTransactionTypes } from "@/constants";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SectionHeader from "@/components/partials/SectionHeader";
import FinanceCard from "@/components/finance/FinanceCard";
import CardsFallback from "@/components/partials/CardsFallback";
import AddFinanceDialog from "@/components/finance/AddFinanceDialog";
import useFinanceStore from "@/stores/financesStore";

const Finances = () => {
  const { finances, setFinances } = useFinanceStore();
  const { transactions, setTransactions, addTransaction } =
    useTransactionStore();
  const [addFinanceOpen, setAddFinanceOpen] = useState(false);
  const [params, setParams] = useState({
    type: "all",
    sort: TransactionSortTypes.DATE,
  });
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  const fetchFinances = useCallback(async () => {
    const response = await getFinances();
    setFinances(response.data);
  }, [setFinances]);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getTransactions(params);
      setTransactions(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [params, setTransactions]);

  const handleAddFinanceDialog = () => {
    setAddFinanceOpen(true);
  };

  const handleAddTransaction = async ({ data, reset }) => {
    await addTransaction(data);
    setAddFinanceOpen(false);
    reset();
    toast.success("Transaction added successfully");
  };

  const handleTabs = (value) => {
    return () => setParams((prev) => ({ ...prev, type: value }));
  };

  const handleSort = (value) => {
    setParams((prev) => ({ ...prev, sort: value }));
  };

  useEffect(() => {
    fetchFinances();
    fetchTransactions();
  }, [fetchFinances, fetchTransactions]);

  return (
    <>
      <SectionHeader
        title="Income & Expenses"
        desc="Track your financial transactions"
        action={
          <Button size="lg" onClick={handleAddFinanceDialog}>
            <Plus /> Add Transaction
          </Button>
        }
      />

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Total income */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <TrendingUp size={32} className="flex-shrink-0 text-green-500" />
            <div>
              <p className="text-muted-foreground text-sm">Total Income</p>
              <p className="text-green-500 text-2xl font-semibold">
                {formatAmount(finances.totalIncome ?? 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total expense */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <TrendingDown
              size={32}
              className="flex-shrink-0 text-destructive"
            />
            <div>
              <p className="text-muted-foreground text-sm">Total Expense</p>
              <p className="text-destructive text-2xl font-semibold">
                {formatAmount(finances.totalExpenses ?? 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Net income */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <Calendar size={32} className="flex-shrink-0 text-blue-500" />
            <div>
              <p className="text-muted-foreground text-sm">Net Income</p>
              <p className="text-2xl font-semibold">
                {formatAmount(finances.netIncome ?? 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
        <Tabs defaultValue={params.type} className="w-full sm:w-[350px]">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger
              value="all"
              className="data-[state=active]:text-primary"
              onClick={handleTabs("all")}
            >
              All
            </TabsTrigger>
            {AvailableTransactionTypes.map((value) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-[state=active]:text-primary"
                onClick={handleTabs(value)}
              >
                {toCapitalize(value)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Select defaultValue={params.sort} onValueChange={handleSort}>
          <SelectTrigger size="lg" className="w-full sm:w-[160px]">
            <div className="flex gap-3">
              <div className="text-muted-foreground/80">
                <ArrowDownUp size={20} aria-hidden="true" />
              </div>
              <SelectValue placeholder="Select a sort" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="p-12 grid place-items-center">
          <LoaderCircle className="text-primary animate-spin size-8" />
        </div>
      ) : transactions.length > 0 ? (
        <div className="grid gap-2">
          {transactions.map((transaction) => (
            <FinanceCard key={transaction._id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <CardsFallback
          icon={TrendingUp}
          title="No transactions yet"
          desc="Start by adding your first income or expense transaction."
          action={
            <Button size="lg" onClick={handleAddFinanceDialog}>
              <Plus /> Add Your First Transaction
            </Button>
          }
        />
      )}

      {/* Dialogs */}
      <AddFinanceDialog
        open={addFinanceOpen}
        onOpenChange={setAddFinanceOpen}
        onAddTransaction={handleAddTransaction}
      />
    </>
  );
};

export default Finances;
