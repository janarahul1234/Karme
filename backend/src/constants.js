/**
 * @type {{ USER: "user", ADMIN: "admin" } as const}
 */
export const UserRoles = {
  USER: "user",
  ADMIN: "admin",
};

export const AvailableUserRoles = Object.values(UserRoles);

/**
 * @type {{ EMAIL: "email", GOOGLE: "google" } as const}
 */
export const LoginTypes = {
  EMAIL: "email",
  GOOGLE: "google",
};

export const AvailableLoginTypes = Object.values(LoginTypes);

/**
 * @type {{
 *   ELECTRONICS: "electronics",
 *   TRAVEL: "travel",
 *   EDUCATION: "education",
 *   FASHION: "fashion",
 *   EVENT: "event",
 *   VEHICLE: "vehicle",
 *   OTHER: "other"
 * } as const}
 */
export const GoalCategories = {
  ELECTRONICS: "electronics",
  TRAVEL: "travel",
  EDUCATION: "education",
  FASHION: "fashion",
  EVENT: "event",
  VEHICLE: "vehicle",
  OTHER: "other",
};

export const AvailableGoalCategories = Object.values(GoalCategories);

/**
 * @type {{ ACTIVE: "active", COMPLETED: "completed", CANCELLED: "cancelled" } as const}
 */
export const GoalStatus = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const AvailableGoalStatus = Object.values(GoalStatus);

/**
 * @type {{ INCOME: "income", EXPENSE: "expense", SAVING: "saving" } as const}
 */
export const TransactionTypes = {
  INCOME: "income",
  EXPENSE: "expense",
  SAVING: "saving",
};

export const AvailableTransactionTypes = Object.values(TransactionTypes);

/**
 * @type {{
 *   SALARY: "salary",
 *   BUSINESS: "business",
 *   FREELANCE: "freelance",
 *   GIFT: "gift",
 *   OTHER: "other"
 * } as const}
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
 * @type {{
 *   FOOD: "food",
 *   RENT: "rent",
 *   SHOPPING: "shopping",
 *   TRANSPORT: "transport",
 *   ENTERTAINMENT: "entertainment",
 *   HEALTH: "health",
 *   UTILITIES: "utilities",
 *   OTHER: "other"
 * } as const}
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
 * @type {{ NAME: "name", AMOUNT: "amount", TARGET_DATE: "targetDate" } as const}
 */
export const GoalSortingTypes = {
  NAME: "name",
  AMOUNT: "amount",
  TARGET_DATE: "targetDate",
};

export const AvailableGoalSortingTypes = Object.values(GoalSortingTypes);

/**
 * @type {{ DATE: "date", AMOUNT: "amount" } as const}
 */
export const TransactionSortTypes = {
  DATE: "date",
  AMOUNT: "amount",
};

export const AvailableTransactionSortTypes =
  Object.values(TransactionSortTypes);
