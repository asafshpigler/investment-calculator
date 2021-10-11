import { ADMIN_USER_ID } from "..";
import { ChartDTO } from "../../../data-transfer-models";
import { getAllPropertyPeriods } from "../../../db/paymentPeriod";
import { getPropertyExpenses } from "../../../db/propertyExpenses";
import { PropertyExpensesDBO } from "../../../db/models/PropertyExpenses";
import { PropertyPeriodDBO } from "../../../db/models/PropertyPeriod";
import { transformToChartFormat } from "./transformToChartFormat";
import { getPropertyMap } from "./getPropertyMap";
import { PropertyMap } from "./charts";

export async function handleGetCharts(req, res, next) {
  console.log('handleGetCharts');

  const userId = ADMIN_USER_ID || req.params.userId

  try {
    // query: get property incomes & expenses
    const periods: PropertyPeriodDBO[] = await getAllPropertyPeriods();
    const expenses: PropertyExpensesDBO[] = await getPropertyExpenses(userId);
    
    // group: incomes & expenses by property id
    const propertyMap: PropertyMap = getPropertyMap(periods, expenses);

    // transform: property data to chart friendly format
    const charts: ChartDTO[] = [];

    for (const [propertyId, monthlyFigures] of propertyMap) {
      const chart: ChartDTO = transformToChartFormat(propertyId, monthlyFigures);
      charts.push(chart);
    }
   
    res.json(charts);
  } catch (error) {
    next(error);
  }
}