import { PropertyExpensesDTO } from '../data-transfer-models';
import { PropertyExpensesDBO } from '../models/PropertyExpenses';
import { client } from './connection';

const PROPERTY_EXPENSES_TABLE = 'public.property_expenses';

export async function getPropertyExpenses(userId: number): Promise<PropertyExpensesDBO[]> {
  console.log('getPropertyExpenses');

  return await client
    .query(
      `SELECT * FROM ${PROPERTY_EXPENSES_TABLE}
      WHERE user_id = $1`,
      [userId]
    )
    .then(res => res.rows)
}

export async function upsertPropertyExpenses(propertyExpenses: PropertyExpensesDTO): Promise<void> {
  console.log('upsertPropertyExpenses');

  const rowsAffected: number = await updatePropertyExpenses(propertyExpenses);
  if (rowsAffected === 0) {
    console.log('no rows updated. row does not exist. insert it instead');
    await insertPropertyExpenses(propertyExpenses);
  }
}

async function updatePropertyExpenses(propertyExpenses: PropertyExpensesDTO): Promise<number> {
  console.log('updatePropertyExpenses');

  const { userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpense } = propertyExpenses;

  return await client
    .query(
      `UPDATE ${PROPERTY_EXPENSES_TABLE}
      SET one_time_expenses = $3, monthly_expenses = $4, mortgage_expense = $5
      WHERE user_id = $1 AND property_id = $2`,
      [userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpense]
    )
    .then(res => res.rowCount);
}

async function insertPropertyExpenses(propertyExpenses: PropertyExpensesDTO): Promise<void> {
  console.log('insertPropertyExpenses');

  const { userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpense } = propertyExpenses;

  await client
    .query(
      `INSERT INTO ${PROPERTY_EXPENSES_TABLE}
      (user_id, property_id, one_time_expenses, monthly_expenses, mortgage_expense)
      VALUES ($1, $2, $3, $4, $5)`,
      [userId, propertyId, oneTimeExpenses, monthlyExpenses, mortgageExpense]
    )
    .then(res => {
      if (res.rowCount !== 1) {
        throw new Error('failed insertion')
      }
    });
}