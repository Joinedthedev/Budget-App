import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = React.createContext();

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

/** 
 * BudgetProvider essentially takes in some sort of prop and passes value of that prop to its children and the
 * children of their children and so forth and so on
 * Everything thats wrapped within budget provider, has access to that value being passed in
 * which makes it easy to share information and manage states across components.
 */
export const BudgetProvider = ({ children }) => {

  /**
   * Using use state here to change, set, and track budget/expense values as need arises.
   * Each budget/expense is put in an array and is indentified via a unique ID.
   */
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  /**
   * This essentially looks through the array of expenses and returns a unique expense
   * by filtering the array based on the ID thats passed through.
   */
  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  /**
   * 
   */
  const addBudget = ({name, max}) => {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)){
        return prevBudgets
      }
      return [...prevBudgets, {id: uuidV4(), name, max} ]
    })
  };


  const deleteBudget = () => {};
  const addExpense = () => {};
  const deleteExpense = () => {};

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        deleteBudget,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
