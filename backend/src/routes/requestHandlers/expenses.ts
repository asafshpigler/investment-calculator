
import { PropertyExpensesDBO } from "../../db/models/PropertyExpenses";
import { getPropertyExpenses, upsertPropertyExpenses } from "../../db/propertyExpenses";
import { PropertyExpensesDTO } from "../../data-transfer-models";
import { ADMIN_USER_ID } from ".";

export async function handleGetPropertyExpenses(req, res, next) {
  console.log('handleGetPropertyExpenses');

  // TO REMOVE AFTER: handling user authentication, cookies
  const userId = ADMIN_USER_ID | req.params.userId;

  try {
    const propertyExpenses: PropertyExpensesDBO[] = await getPropertyExpenses(userId);
    res.json(propertyExpenses);
  } catch (error) {
    next(error);
  }
}

export async function handleUpdatePropertyExpenses(req, res, next) {
  console.log('handleUpdatePropertyExpenses');

  const propertyExpenses: PropertyExpensesDTO = req.body;

  // TO REMOVE AFTER: handling user authentication, cookies
  propertyExpenses.userId = ADMIN_USER_ID

  try {
    await upsertPropertyExpenses(propertyExpenses);
    res.end();
  } catch (error) {
    next(error);
  }
}

