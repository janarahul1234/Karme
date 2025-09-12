import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  IndianRupee,
  Trash2,
} from "lucide-react";

import { formatAmount } from "@/utils/helper";
import useGoalStore from "@/stores/goalStore";
import useToast from "@/hooks/useToast";
import { GoalStatus } from "@/constants";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import GoalFormDialog from "@/components/goal/GoalFormDialog";
import DeleteGoalDialog from "@/components/goal/DeleteGoalDialog";
import AddSavingsDialog from "@/components/goal/AddSavingsDialog";

const GoalCard = ({ goal = {} }) => {
  const {
    name,
    category,
    targetAmount,
    savedAmount,
    targetDate,
    imageUrl,
    status,
  } = goal;

  const { addSaving, editGoal, deleteGoal } = useGoalStore();
  const toast = useToast();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddSavingsDialogOpen, setIsAddSavingsDialogOpen] = useState(false);

  const handleEditGoalDialog = () => setIsEditDialogOpen(true);
  const handleDeleteGoalDialog = () => setIsDeleteDialogOpen(true);
  const handleAddSavingsGoalDialog = () => setIsAddSavingsDialogOpen(true);

  const handleAddSaving = async ({ id, data, reset }) => {
    await addSaving(id, data);
    setIsAddSavingsDialogOpen(false);
    reset();
    toast.success("Saving added successfully");
  };

  const handleEditGoal = async ({ id, data, reset }) => {
    await editGoal(id, data);
    setIsEditDialogOpen(false);
    reset();
    toast.success("Goal edited successfully");
  };

  const handleDelete = async (id) => {
    await deleteGoal(id);
    setIsDeleteDialogOpen(false);
    onDelete(id);
    toast.success("Goal deleted successfully");
  };

  const progress = (savedAmount / targetAmount) * 100;
  const remaining = targetAmount - savedAmount;

  const oneDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil(
    (new Date(targetDate).getTime() - new Date().getTime()) / oneDay
  );

  return (
    <>
      <Card className="group shadow-none overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/10">
        <div className="bg-muted aspect-16/9 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader className="pt-4 border-0 items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <p className="text-muted-foreground text-sm capitalize">
              {category}
            </p>
          </div>
          {/* <StatusBadge status={status} /> */}
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatAmount(savedAmount)} saved</span>
              <span>{formatAmount(targetAmount)} goal</span>
            </div>
          </div>

          <div className="bg-muted/50 grid grid-cols-2 gap-4 text-center py-4 rounded-lg">
            <div>
              <div className="text-destructive font-semibold">
                {formatAmount(remaining)}
              </div>
              <div className="text-muted-foreground text-sm">Remaining</div>
            </div>
            <div>
              <div className="text-primary font-semibold">{daysLeft} days</div>
              <div className="text-muted-foreground text-sm">Left</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleAddSavingsGoalDialog}
            >
              <IndianRupee /> Add Savings
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2.5"
              onClick={handleEditGoalDialog}
            >
              <Edit /> Edit
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="text-muted-foreground hover:text-destructive"
              onClick={handleDeleteGoalDialog}
            >
              <Trash2 className="opacity-100" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddSavingsDialog
        open={isAddSavingsDialogOpen}
        onOpenChange={setIsAddSavingsDialogOpen}
        goal={goal}
        onAddSaving={handleAddSaving}
      />

      <GoalFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        goal={goal}
        onSubmit={handleEditGoal}
      />

      <DeleteGoalDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        goal={goal}
        onDelete={handleDelete}
      />
    </>
  );
};

function StatusBadge({ status }) {
  const variants = {
    [GoalStatus.AHEAD]: "success",
    [GoalStatus.BEHIND]: "destructive",
    [GoalStatus.ON_TRACK]: "warning",
  };

  const labels = {
    [GoalStatus.AHEAD]: "Ahead",
    [GoalStatus.BEHIND]: "Behind",
    [GoalStatus.ON_TRACK]: "On Track",
  };

  const icons = {
    [GoalStatus.AHEAD]: CheckCircle,
    [GoalStatus.BEHIND]: AlertCircle,
    [GoalStatus.ON_TRACK]: Clock,
  };

  const Icon = icons[status];

  return (
    <Badge
      shape="circle"
      variant={variants[status]}
      appearance="outline"
      className="mt-1"
    >
      <Icon />
      {labels[status]}
    </Badge>
  );
}

export default GoalCard;
