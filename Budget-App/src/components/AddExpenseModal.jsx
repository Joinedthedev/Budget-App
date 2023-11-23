import { Modal, Form, Button } from "react-bootstrap";
import React from "react";
import { useRef } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetsContext";

/**This component displays an expense modal that allows the user to add an expense to their budget. We implement useRef here to get the reference to elements that are being used.
 * Its kind of like document.querySelector but for react.
 */
const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      /** //takes the current value of our description from our form and assigns it to expense object */
      descriptionRef: descriptionRef.current.value,

      /** //takes the current value of our amount from our form and assigns it to expense object */
      amount: parseFloat(amountRef.current.value),

      /** //takes the current value of our budgetID from our form and assigns it to expense object */
      budgetId: budgetIdRef.current.value,
    });

    handleClose();
  };
  return (
    // Modal is a bootstrap component that comes with predefined properties such as Header, title and body.
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={1}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            {/** The purpose of defaultBudgetId is that when you add an expense to a budget it should default to the budget
             * the user is adding it to instead of showing the first option which is uncategorized. The only time it will show uncategorized is
             * when you are adding an expense that isn't attached to a budget.
             */}
            <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
              <option>{UNCATEGORIZED_BUDGET_ID}</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
