import { Modal, Stack, Button } from "react-bootstrap";
import React from "react";

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetsContext";
import { currencyFormatter } from "./utils";

const ViewExpensesModal = ({ budgetID, handleClose }) => {

  const { getBudgetExpenses, deleteBudget, deleteExpense, budgets } =
    useBudgets();
  const expenses = getBudgetExpenses(budgetID);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetID
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetID);

  return (
    <Modal show={budgetID != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetID !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
