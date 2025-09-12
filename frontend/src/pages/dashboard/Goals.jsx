import { useEffect, useState } from "react";
import {
  ArrowDownUp,
  ListFilter,
  LoaderCircle,
  Plus,
  Search,
} from "lucide-react";

import { getGoals } from "@/apis/goal";
import useGoalStore from "@/stores/goalStore";
import useToast from "@/hooks/useToast";

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
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  const handleAddGoalDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddGoal = async ({ data, reset }) => {
    await addGoal(data);
    setIsAddDialogOpen(false);
    reset();
    toast.success("Goal added successfully");
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getGoals();
      setGoals(response.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <SectionHeader
        title="Savings Goals"
        desc="Manage your product savings goals"
        action={
          <Button size="lg" onClick={handleAddGoalDialog}>
            <Plus /> Add Goal
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-8">
        {/* Search box */}
        <div className="relative w-full sm:max-w-xs">
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-4 peer-disabled:opacity-50">
            <Search size={20} aria-hidden="true" />
          </div>
          <Input
            type="text"
            placeholder="Search goals..."
            variant="lg"
            className="peer ps-12"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger
              size="lg"
              className="w-full sm:w-[180px] cursor-pointer"
            >
              <div className="flex gap-3">
                <div className="text-muted-foreground/80">
                  <ListFilter size={20} aria-hidden="true" />
                </div>
                <SelectValue placeholder="Select a category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Category</SelectItem>
              {AvailableGoalCategories.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue={GoalSortTypes.NAME}>
            <SelectTrigger
              size="lg"
              className="w-full sm:w-[180px] cursor-pointer"
            >
              <div className="flex gap-3">
                <div className="text-muted-foreground/80">
                  <ArrowDownUp size={20} aria-hidden="true" />
                </div>
                <SelectValue placeholder="Select a sort" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {AvailableGoalSortTypes.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
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
