import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  IndianRupee,
  Trash2,
} from "lucide-react";

import useToast from "@/hooks/useToast";
import useGoalStore from "@/stores/goalStore";
import { GoalStatus } from "@/constants";
import { formatAmount } from "@/utils/helper";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import GoalFormDialog from "@/components/goal/GoalFormDialog";
import DeleteGoalDialog from "@/components/goal/DeleteGoalDialog";
import AddSavingsDialog from "@/components/goal/AddSavingsDialog";

const goalCompleted = "completed";

const GoalCard = ({ goal = {} }) => {
  const {
    name,
    category,
    targetDate,
    targetAmount,
    savedAmount,
    progress,
    imageUrl,
    status,
  } = goal;

  const { addGoalTransaction, editGoal, deleteGoal } = useGoalStore();
  const toast = useToast();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddSavingsDialogOpen, setIsAddSavingsDialogOpen] = useState(false);

  const handleEditGoalDialog = () => setIsEditDialogOpen(true);
  const handleDeleteGoalDialog = () => setIsDeleteDialogOpen(true);
  const handleAddSavingsGoalDialog = () => setIsAddSavingsDialogOpen(true);

  const handleAddSaving = async ({ id, data, reset }) => {
    await addGoalTransaction(id, data);
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
    toast.success("Goal deleted successfully");
  };

  const remaining = targetAmount - savedAmount;

  const oneDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil(
    (new Date(targetDate).getTime() - new Date().getTime()) / oneDay
  );

  const isGoalCompleted = status === goalCompleted;

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

        <CardHeader className="pt-4 border-0 grow flex-nowrap items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <p className="text-muted-foreground text-sm capitalize">
              {category}
            </p>
          </div>
          <StatusBadge status={status} />
        </CardHeader>

        <CardContent className="grow-0 space-y-4">
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
              disabled={isGoalCompleted}
            >
              <IndianRupee /> Add Savings
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2.5"
              onClick={handleEditGoalDialog}
              disabled={isGoalCompleted}
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
    [GoalStatus.ACTIVE]: { label: "Active", icon: Clock },
    [GoalStatus.COMPLETED]: { label: "Completed", icon: CheckCircle },
  };

  const Icon = variants[status].icon;

  return (
    <Badge
      shape="circle"
      variant="success"
      appearance="outline"
      className="flex-shrink-0 mt-1"
    >
      <Icon />
      {variants[status].label}
    </Badge>
  );
}

export default GoalCard;
