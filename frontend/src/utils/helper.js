import { GoalStatus } from "@/constants";

export function formatAmount(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatAmountDetailed(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function toCapitalize(str = "") {
  const cleaned = str.split("-").join(" ");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

export function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function getDayPeriod() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export function getPersonalizedMessage(goals = [], netIncome = 0) {
  if (goals.length === 0) {
    return "Ready to start your savings journey? Add your first goal to get started!";
  }

  const completedGoals = goals.filter(
    (g) => g.status === GoalStatus.COMPLETED
  ).length;
  const activeGoals = goals.length - completedGoals;

  if (completedGoals > 0) {
    return `Congratulations on completing ${completedGoals} goal${
      completedGoals > 1 ? "s" : ""
    }! You have ${activeGoals} active goal${
      activeGoals !== 1 ? "s" : ""
    } remaining.`;
  }

  if (netIncome > 0) {
    return `You're doing great! With ${formatAmount(
      netIncome
    )} available monthly, you're on track to reach your goals.`;
  }

  return `You have ${activeGoals} active goal${
    activeGoals !== 1 ? "s" : ""
  }. Let's work together to achieve them!`;
}
