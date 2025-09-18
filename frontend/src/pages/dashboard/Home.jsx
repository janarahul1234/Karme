import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartPie,
  LoaderCircle,
  PiggyBank,
  Plus,
  Target,
  Type,
  Wallet,
} from "lucide-react";

import useAuthStore from "@/stores/authStore";
import useDashboardStore from "@/stores/dashboardStore";
import useGoalStore from "@/stores/goalStore";

import { getDashboard } from "@/apis/dashboard";
import { getGoals } from "@/apis/goal";

import { GoalSortTypes } from "@/constants";

import {
  formatAmount,
  getDayPeriod,
  getPersonalizedMessage,
} from "@/utils/helper";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import SectionHeader from "@/components/partials/SectionHeader";
import GoalCard from "@/components/goal/GoalCard";
import CardsFallback from "@/components/partials/CardsFallback";

const Home = () => {
  const { user } = useAuthStore();
  const { dashboard, setDashboard } = useDashboardStore();
  const { goals, setGoals } = useGoalStore();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDashboard = useCallback(async () => {
    const response = await getDashboard();
    setDashboard(response.data);
  }, [setDashboard]);

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getGoals({
        sort: GoalSortTypes.NAME,
        status: "active",
      });
      setGoals(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [setGoals]);

  const handleAddGoal = () => {
    navigate("/goals");
  };

  useEffect(() => {
    fetchDashboard();
    fetchGoals();
  }, [fetchDashboard, fetchGoals]);

  return (
    <>
      <SectionHeader
        title={`
          Good ${getDayPeriod()}, ${user?.fullName?.split(" ")[0] || "there"} 👋
        `}
        desc={getPersonalizedMessage(goals, dashboard.netIncome)}
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
              <p className="text-2xl font-semibold">
                {dashboard.activeGoals ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Net income */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <Wallet size={32} className="flex-shrink-0 text-green-500" />
            <div>
              <p className="text-muted-foreground text-sm">Net Income</p>
              <p className="text-2xl font-semibold">
                {formatAmount(dashboard.netIncome ?? 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total saved */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <PiggyBank size={32} className="flex-shrink-0 text-blue-500" />
            <div>
              <p className="text-muted-foreground text-sm">Total Saved</p>
              <p className="text-2xl font-semibold">
                {formatAmount(dashboard.totalSaved ?? 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Overall progress */}
        <Card>
          <CardContent className="flex items-center gap-4">
            <ChartPie size={32} className="flex-shrink-0 text-orange-500" />
            <div>
              <p className="text-muted-foreground text-sm">Overall Progress</p>
              <p className="text-2xl font-semibold">
                {dashboard.overallProgress?.toFixed(1) ?? 0}%
              </p>
            </div>
          </CardContent>
        </Card>
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
          icon={Target}
          title="No savings goals yet"
          desc="Start by adding your first product goal to begin tracking your savings."
          action={
            <Button size="lg" onClick={handleAddGoal}>
              <Plus /> Add Your First Goal
            </Button>
          }
        />
      )}
    </>
  );
};

export default Home;
