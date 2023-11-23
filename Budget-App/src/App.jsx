import { Container } from "react-bootstrap";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import { useBudgets } from "./context/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";

function App() {
  //These are the states that manage our modals.
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setShowAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setShowAddExpenseModalBudgetId(budgetId);
  };
  return (
    <>
    {/** container,  stack, and button are all bootstrap components. Think of container as a wrapper and stack is a group within
     *  that wrappper. Button is a button
     */}
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            {" "}
            Add Budget
          </Button>

          
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {/** The code below essentially maps out each budget from the budget array based on the budget id
           * The  amount is gotten by iterating over the array of expenses unique to each budget and adding them together.
           */}
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (

              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                gray
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            );
          })}
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />

      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={ () => setShowAddExpenseModal(false)}
        
        /** The purpose of defaultBudgetId is that when you add an expense to a budget it should default to the specfic budget
         * the user is adding it to instead of showing the first option which is uncategorized. The only time it will show uncategorized is
         * when you are adding an expense that isn't attached to a budget. In other words, clicking the addExpense on the top right of the display.
         */
        defaultBudgetId={addExpenseModalBudgetId}
      />
    </>
  );
}

export default App;
