/**
 * @type {{ LIGHT: "light", DARK: "dark" } as const}
 */
export const Theme = {
  LIGHT: "light",
  DARK: "dark",
};

/**
 * @type {{ ACTIVE: "active", COMPLETED: "completed" } as const}
 */
export const GoalStatus = {
  ACTIVE: "active",
  COMPLETED: "completed",
};

/**
 * @type {{ ELECTRONICS: "electronics", TRAVEL: "travel", EDUCATION: "education", FASHION: "fashion", ENTERTAINMENT: "entertainment", EVENT: "event", VEHICLE: "vehicle", OTHER: "other" } as const}
 */
export const GoalCategories = {
  ELECTRONICS: "electronics",
  TRAVEL: "travel",
  EDUCATION: "education",
  FASHION: "fashion",
  ENTERTAINMENT: "entertainment",
  EVENT: "event",
  VEHICLE: "vehicle",
  OTHER: "other",
};

export const AvailableGoalCategories = Object.values(GoalCategories);

/**
 * @type {{ NAME: "name", AMOUNT: "amount", PROGRESS: "progress", TARGET_DATE: "target-date" } as const}
 */
export const GoalSortTypes = {
  NAME: "name",
  AMOUNT: "amount",
  PROGRESS: "progress",
  TARGET_DATE: "target-date",
};

export const AvailableGoalSortTypes = Object.values(GoalSortTypes);

/**
 * @type {{ INCOME: "income", EXPENSE: "expense" } as const}
 */
export const TransactionTypes = {
  INCOME: "income",
  EXPENSE: "expense",
};

export const AvailableTransactionTypes = Object.values(TransactionTypes);

/**
 * @type {{ SALARY: "salary", BUSINESS: "business", FREELANCE: "freelance", GIFT: "gift", OTHER: "other" } as const}
 */
export const IncomeCaregories = {
  SALARY: "salary",
  BUSINESS: "business",
  FREELANCE: "freelance",
  GIFT: "gift",
  OTHER: "other",
};

export const AvailableIncomeCaregories = Object.values(IncomeCaregories);

/**
 * @type {{ FOOD: "food", RENT: "rent", SHOPPING: "shopping", TRANSPORT: "transport", ENTERTAINMENT: "entertainment", HEALTH: "health", UTILITIES: "utilities", OTHER: "other" } as const}
 */
export const ExpenseCategories = {
  FOOD: "food",
  RENT: "rent",
  SHOPPING: "shopping",
  TRANSPORT: "transport",
  ENTERTAINMENT: "entertainment",
  HEALTH: "health",
  UTILITIES: "utilities",
  OTHER: "other",
};

export const AvailableExpenseCategories = Object.values(ExpenseCategories);

/**
 * @type {{ DATE: "date", AMOUNT: "amount" } as const}
 */
export const TransactionSortTypes = {
  DATE: "date",
  AMOUNT: "amount",
};

export const AvailableTransactionSortTypes =
  Object.values(TransactionSortTypes);
