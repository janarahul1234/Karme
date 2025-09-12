import { useState } from "react";
import { ChartPie, PiggyBank, Plus, Target, Wallet } from "lucide-react";

import { useUser } from "@/context/UserContext";
import { formatAmount } from "@/utils/helper";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import SectionHeader from "@/components/partials/SectionHeader";
import CardsFallback from "@/components/partials/CardsFallback";
import GoalFormDialog from "@/components/goal/GoalFormDialog";

const Home = () => {
  const { user } = useUser();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddGoal = () => {
    setIsAddDialogOpen(true);
  };

  return (
    <>
      <SectionHeader
        title={`Good evening, ${user.fullName?.split(" ")[0]} 👋`}
        desc="Ready to start your savings journey? Add your first goal to get started!"
        action={
          <Button size="lg" onClick={handleAddGoal}>
            <Plus /> Add Goal
          </Button>
        }
      />

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Active goals */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <Target size={32} className="flex-shrink-0 text-purple-500" />
            <div>
              <p className="text-muted-foreground text-sm">Active Goals</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </CardContent>
        </Card>

        {/* Net income */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <Wallet size={32} className="flex-shrink-0 text-green-500" />
            <div>
              <p className="text-muted-foreground text-sm">Net Income</p>
              <p className="text-2xl font-semibold">{formatAmount(123)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Total saved */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <PiggyBank size={32} className="flex-shrink-0 text-blue-500" />
            <div>
              <p className="text-muted-foreground text-sm">Total Saved</p>
              <p className="text-2xl font-semibold">{formatAmount(456)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Overall progress */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <ChartPie size={32} className="flex-shrink-0 text-orange-500" />
            <div>
              <p className="text-muted-foreground text-sm">Overall Progress</p>
              <p className="text-2xl font-semibold">25%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <CardsFallback
        icon={Target}
        title="No savings goals yet"
        desc="Start by adding your first product goal to begin tracking your savings."
        action={
          <Button size="lg" onClick={handleAddGoal}>
            <Plus /> Add Your First Goal
          </Button>
        }
      />

      {/* Dialogs */}
      <GoalFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
};

export default Home;
