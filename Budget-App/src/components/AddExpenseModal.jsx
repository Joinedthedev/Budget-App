import { Modal, Form, Button } from "react-bootstrap";
import React from "react";
import { useRef } from "react";
import { useBudgets } from "../context/BudgetsContext";

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      descriptionRef: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });

    handleClose();
  };
  return (
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
            <Form.Select defaultValue={budgetIdRef}>
             
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
