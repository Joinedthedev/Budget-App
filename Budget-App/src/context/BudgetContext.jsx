import React, {useContext} from "react";

const BudgetsContext = React.createContext();

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetProvider = ({ children }) => {
  return <BudgetsContext.Provider value ={{}}>
    {children}
    </BudgetsContext.Provider>;
};
