
import { PropertyExpensesDBO } from "../../db/models/PropertyExpenses";
import { getPropertyExpenses, upsertPropertyExpenses } from "../../db/propertyExpenses";
import { PropertyExpensesDTO } from "../../data-transfer-models";

export async function handleGetPropertyExpenses(req, res, next) {
  console.log('handleGetPropertyExpenses');

  // TO REMOVE AFTER: handling user authentication, cookies
  // ITS OK: this request handler will become deprecated later eitherway. we can get expenses and charts
  //    and numbers separately, but since we don't have a caching service (yet!), and it's additional network requests
  //    that redunandt and ineffecit
  // SOON DEPRECATED anyways
  const {id: userId} = req.session.user || {};

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
  propertyExpenses.userId = req.session.user;

  try {
    await upsertPropertyExpenses(propertyExpenses);
    res.end();
  } catch (error) {
    next(error);
  }
}

