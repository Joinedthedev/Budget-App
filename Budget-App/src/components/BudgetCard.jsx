import React from "react";
import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "./utils";

/** This returns a string that is used to change the progress bar variant(color essentially)
 *  based on the amount of money spent within a budget. 
 */
const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;

  //If amount expenditure is less than 50% keep the color of progress bar blue
  if (ratio < 0.5) {
    return "primary";
  }

  //if amount expenditure is greater than or equal to 50% and less than 75% turn the progress bar yellow to warn
  if (ratio < 0.75) {
    return "warning";
  }

  //Anything greater than 75%; turn the color of the progress bar red for danger zone
  else {
    return "danger";
  }
};

/** The budget card component takes in four props name, amount, gray and max.
 * It represents the main cards used to display the budgets on the screen.
 */

const BudgetCard = ({ name, amount, max, gray }) => {

    /**Code below changes the color of the card based on whether user has exceeded budget.
     * It pushes the colors into an array and sets that array to the className of the card.
     * if the amount is greater than the max, the card will turn red
     * else it is by default gray 
    */
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10"); // red background
  } else if (gray) {
    classNames.push("bg-light"); //gray background
  }
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fwnormal mb-3">
          <div className="me-2">{name}</div>{" "}
          {/** Name of the specific budget e.g Entertainment, Food Travel, Etc */}
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)} /{" "}
            <span className="fs-6 text-muted ms-1">
              {currencyFormatter.format(max)}
            </span>
          </div>
        </Card.Title>

{/** Progress bar is a bootstrap component. The variant(color) changes based on our getProgressBarVariant function */}
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
{/** */}
        <Stack className="mt-4" direction="horizontal" gap="2">
          <Button variant="outline-primary" className="ms-auto">
            Add Expense
          </Button>
          <Button variant="outline-secondary">View Expense</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
