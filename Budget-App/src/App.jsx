import { Container } from "react-bootstrap";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import { useBudgets } from "./context/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const { budgets, getBudgetExpenses } = useBudgets();

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            {" "}
            Add Budget
          </Button>
          <Button variant="outline-primary"> Add Expense</Button>
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
            )
            return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              gray
            />
            )
          })}
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />

<AddExpenseModal
        show={true}
        // handleClose={() => setShowAddBudgetModal(false)}
      />
    </>
  );
}

export default App;
