import { useBudgets } from "../context/BudgetsContext";
import React from "react";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = () => {
  const { expenses,budgets } = useBudgets();
  //iterates over each expense in the array of expenses and accumulates them into a total amount
  const amount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const max = expenses.reduce(
    (total, budget) => total + budget.max,
    0
  );

  


  if (max == 0) return null
  return <BudgetCard gray amount = {amount} name="Total" max={max} />;
};

export default TotalBudgetCard;
