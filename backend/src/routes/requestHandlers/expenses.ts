import * as db from "../../db";
import { PropertyExpensesDBO } from "../../db/models/PropertyExpenses";
import { ChartDTO, MortgageExpenseDTO, NORMAL_LOAN, PropertyExpensesDTO, SpitzerLoanDTO, SPITZER_LOAN } from "../../data-transfer-models";
import { getChart, getCharts } from '.';

export async function handleGetPropertyExpenses(req, res, next) {
  console.log('handleGetPropertyExpenses');

  // TO REMOVE AFTER: handling user authentication, cookies
  // ITS OK: this request handler will become deprecated later eitherway. we can get expenses and charts
  //    and numbers separately, but since we don't have a caching service (yet!), and it's additional network requests
  //    that redunandt and ineffecit
  // SOON DEPRECATED anyways

  try {
    validateGetPropertyExpenses(req);

    const userId = req.session.user.id;
    const propertyExpenses: PropertyExpensesDBO[] = await db.getPropertiesExpenses(userId);

    res.json(propertyExpenses);
  } catch (error) {
    next(error);
  }
}

function validateGetPropertyExpenses(req) {
  if (!req.session.user) {
    throw new Error('invalid get property expenses input');
  }
}

export async function handleUpdatePropertyExpenses(req, res, next) {
  console.log('handleUpdatePropertyExpenses');

  try {
    const propertyExpenses: PropertyExpensesDTO = req.body;
    const userId = req.session.user.id;
    propertyExpenses.userId = userId

    validateUpdatePropertyExpenses(req);

    await db.upsertPropertyExpenses(req.body);

    const chart: ChartDTO = await getChart(req, propertyExpenses.propertyId);

    res.json(chart);
  } catch (error) {
    next(error);
  }
}

function validateUpdatePropertyExpenses(req) {
  const {
    userId,
    propertyId,
    oneTimeExpenses,
    monthlyExpenses,
    mortgageExpenses
  } = <PropertyExpensesDTO>req.body;

  if (!userId || !propertyId) {
    throw new Error(
      `invalid update property expenses input,
      can\'t tell which row to update, userId: ${userId}, propertyId: ${propertyId}`);
  }

  validateMortgageExpenses(mortgageExpenses);


  function validateMortgageExpenses(mortgageExpenses: MortgageExpenseDTO) {
    const {type} = mortgageExpenses;

    if (type === SPITZER_LOAN) {
      const { startDate, loanAmount, duration, loanRate } = <SpitzerLoanDTO>mortgageExpenses;

      const isValid = (
        /\d{4}-\d{2}-\d{2}/.test(startDate) &&
        typeof loanAmount === 'number' &&
        typeof duration === 'number' &&
        typeof loanRate === 'number'
      )

      if (!isValid) {
        throw new Error(`invalid update property expenses input, json: ${JSON.stringify(mortgageExpenses)}`);
      }
    }

    else if (type === NORMAL_LOAN) {
      // TODO: implement validation
    }

    else {
      throw new Error(`invalid update property expenses input, invalid type: ${type}`);
    }
  }
}
