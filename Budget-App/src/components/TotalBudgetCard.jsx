import { useBudgets } from "../context/BudgetsContext";
import React from "react";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = () => {
  const { expenses,budgets } = useBudgets();
  //iterates over each expense amount in the array of expenses and accumulates them into a total expense
  const amount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  //iterates over each maximum budge in the array of budgets and accumulates them into a total max
  const max = budgets.reduce(
    (total, budget) => total + budget.max,
    0
  );

  


  if (max == 0) return null
  return <BudgetCard gray amount = {amount} name="Total" max={max} hideButtons={true} />;
};

export default TotalBudgetCard;
