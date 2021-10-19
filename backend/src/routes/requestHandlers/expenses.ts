import * as db from "../../db";
import { ChartDTO, MonthlyExpenseDTO, MortgageExpenseDTO, NormalLoanDTO, NORMAL_LOAN, OneTimeExpenseDTO, PropertyExpensesDTO, SpitzerLoanDTO, SPITZER_LOAN } from "../../dataTransferModels";
import { getChart } from '.';

const DATE_STRING_REGEX = /\d{4}-\d{2}-\d{2}/;

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

  validateOneTimeExpenses(oneTimeExpenses);
  validateMonthlyExpenses(monthlyExpenses);
  validateMortgageExpenses(mortgageExpenses);

  function validateOneTimeExpenses(oneTimeExpenses: OneTimeExpenseDTO[]) {
    const isValid = oneTimeExpenses.every(({paymentDate, amount}) => (
      DATE_STRING_REGEX.test(paymentDate) &&
      typeof amount === 'number'
    ))

    if (!isValid) {
      throw new Error(`invalid update property expenses input, invalid one time expenes, json: ${JSON.stringify(oneTimeExpenses)}`);
    }
  }

  function validateMonthlyExpenses(monthlyExpenses: MonthlyExpenseDTO[]) {
    const isValid = monthlyExpenses.every(({startDate, amount, duration}) => (
      DATE_STRING_REGEX.test(startDate) &&
      typeof amount === 'number' &&
      typeof duration  === 'number'
    ))

    if (!isValid) {
      throw new Error(`invalid update property expenses input, invalid monthly expenes, json: ${JSON.stringify(monthlyExpenses)}`);
    }
  }

  function validateMortgageExpenses(mortgageExpenses: MortgageExpenseDTO) {
    const { type } = mortgageExpenses;

    const { startDate, loanAmount } = mortgageExpenses;
    const isCommonValid = (
      DATE_STRING_REGEX.test(startDate) &&
      typeof loanAmount === 'number'
    );

    let isCustomValid = null;
    switch (type) {
      case SPITZER_LOAN:
        const { duration, loanRate } = <SpitzerLoanDTO>mortgageExpenses;

        isCustomValid = (
          typeof duration === 'number' &&
          typeof loanRate === 'number'
        );
        break;

      case NORMAL_LOAN:
        const { paymentPeriods } = <NormalLoanDTO>mortgageExpenses;

        isCustomValid = (
          paymentPeriods.every(({ duration, amount }) => (
            typeof duration === 'number' &&
            typeof amount === 'number'
          ))
        );
        break;

      default:
        throw new Error(`invalid update property expenses input, invalid type: ${type}`);
    }

    const isValid = isCommonValid && isCustomValid;
    if (!isValid) {
      throw new Error(`invalid update property expenses input, json: ${JSON.stringify(mortgageExpenses)}`);
    }
  }
}
