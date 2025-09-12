import { useEffect, useState } from "react";
import {
  ArrowDownUp,
  Calendar,
  LoaderCircle,
  Plus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import useTransactionStore from "@/stores/transactionStore";
import { getTransactions } from "@/apis/transaction";
import { formatAmount } from "@/utils/helper";

import useToast from "@/hooks/useToast";
import { TransactionTypes } from "@/constants";

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

const TabsOptions = [
  { label: "All", value: "all" },
  { label: "Income", value: TransactionTypes.INCOME },
  { label: "Expense", value: TransactionTypes.EXPENSE },
];

const Finances = () => {
  const { transactions, setTransactions, addTransaction } =
    useTransactionStore();
  const [addFinanceOpen, setAddFinanceOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  const handleTabsChange = (value) => {
    return () => setCurrentTab(value);
  };

  const handleAddFinanceDialog = () => {
    setAddFinanceOpen(true);
  };

  const handleAddTransaction = async ({ data, reset }) => {
    await addTransaction(data);
    setAddFinanceOpen(false);
    reset();
    toast.success("Transaction added successfully");
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getTransactions();
      setTransactions(response.data);
      setIsLoading(false);
    })();
  }, []);

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
                {formatAmount(123)}
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
                {formatAmount(456)}
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
              <p className="text-2xl font-semibold">{formatAmount(789)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
        <Tabs defaultValue="all" className="w-full sm:w-[350px]">
          <TabsList className="w-full grid grid-cols-3">
            {TabsOptions.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-[state=active]:text-primary"
                onClick={handleTabsChange(value)}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Select defaultValue="date">
          <SelectTrigger
            size="lg"
            className="w-full sm:w-[160px] cursor-pointer"
          >
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
