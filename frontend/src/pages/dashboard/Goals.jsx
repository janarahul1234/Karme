import { useEffect, useState, useCallback } from "react";
import {
  ArrowDownUp,
  ListFilter,
  LoaderCircle,
  Plus,
  Search,
} from "lucide-react";

import useToast from "@/hooks/useToast";
import useGoalStore from "@/stores/goalStore";
import { getGoals } from "@/apis/goal";

import { toCapitalize, debounce } from "@/utils/helper";
import {
  AvailableGoalCategories,
  GoalSortTypes,
  AvailableGoalSortTypes,
} from "@/constants";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SectionHeader from "@/components/partials/SectionHeader";
import GoalCard from "@/components/goal/GoalCard";
import CardsFallback from "@/components/partials/CardsFallback";
import GoalFormDialog from "@/components/goal/GoalFormDialog";

const Goals = () => {
  const { goals, setGoals, addGoal } = useGoalStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [params, setParams] = useState({
    search: "",
    category: "all",
    sort: GoalSortTypes.NAME,
  });
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getGoals(params);
      setGoals(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [params, setGoals]);

  const handleAddGoal = async ({ data, reset }) => {
    await addGoal(data);
    setIsAddDialogOpen(false);
    reset();
    toast.success("Goal added successfully");
  };

  const handleSearch = debounce((e) => {
    setParams((prev) => ({ ...prev, search: e.target.value }));
  }, 500);

  const handleCategory = (value) => {
    setParams((prev) => ({ ...prev, category: value }));
  };

  const handleSort = (value) => {
    setParams((prev) => ({ ...prev, sort: value }));
  };

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return (
    <>
      <SectionHeader
        title="Savings Goals"
        desc="Manage your product savings goals"
        action={
          <Button size="lg" onClick={() => setIsAddDialogOpen(true)}>
            <Plus /> Add Goal
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-8">
        {/* Search box */}
        <div className="relative w-full sm:max-w-xs">
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
            <Search size={20} aria-hidden="true" />
          </div>
          <Input
            type="text"
            placeholder="Search goals..."
            variant="lg"
            className="ps-12"
            onInput={handleSearch}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={params.category} onValueChange={handleCategory}>
            <SelectTrigger size="lg" className="w-full sm:w-[180px]">
              <div className="flex gap-3">
                <ListFilter size={20} className="text-muted-foreground/80" />
                <SelectValue placeholder="Select a category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {AvailableGoalCategories.map((value) => (
                <SelectItem key={value} value={value}>
                  {toCapitalize(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={params.sort} onValueChange={handleSort}>
            <SelectTrigger size="lg" className="w-full sm:w-[180px]">
              <div className="flex gap-3">
                <ArrowDownUp size={20} className="text-muted-foreground/80" />
                <SelectValue placeholder="Select a sort" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {AvailableGoalSortTypes.map((value) => (
                <SelectItem key={value} value={value}>
                  {toCapitalize(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Goals */}
      {isLoading ? (
        <div className="p-12 grid place-items-center">
          <LoaderCircle className="text-primary animate-spin size-8" />
        </div>
      ) : goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {goals.map((goal) => (
            <GoalCard key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (
        <CardsFallback
          icon={Plus}
          title="No savings goals yet"
          desc="Start by adding your first product goal."
        />
      )}

      {/* Dialogs */}
      <GoalFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddGoal}
      />
    </>
  );
};

export default Goals;
