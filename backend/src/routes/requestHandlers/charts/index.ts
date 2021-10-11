import { ADMIN_USER_ID } from "..";
import { ChartDTO } from "../../../data-transfer-models";
import { getAllPropertyPeriods } from "../../../db/paymentPeriod";
import { getPropertyExpenses } from "../../../db/propertyExpenses";
import { PropertyExpensesDBO } from "../../../db/models/PropertyExpenses";
import { PropertyPeriodDBO } from "../../../db/models/PropertyPeriod";
import { convert } from "./convert";
import { getPropertyMap } from "./getPropertyMap";
import { PropertyMap } from "./models";

/*
  restructure charts folder, with separate files. make sure it makes sense

  confusing terminology, month, and period,
  where month describes a period actually, a unique year and month
  and period is already used in DB level, consider how to change the terms here to specifiate the different
  steps in this process
*/

// specific property, and all it's periods


export async function handleGetCharts(req, res, next) {
  console.log('handleGetCharts');

  const userId = ADMIN_USER_ID || req.params.userId

  try {
    // all property periods we have, all income data
    const periods: PropertyPeriodDBO[] = await getAllPropertyPeriods();
    
    // query: all property expenses inserted by this specific user
    const expenses: PropertyExpensesDBO[] = await getPropertyExpenses(userId);
    
    // combine: map of property_id to it's income potential and expenses
    const propertyMap: PropertyMap = getPropertyMap(periods, expenses);

    // convert data to the way chart.js likes it
    const charts: ChartDTO[] = [];

    for (const [propertyId, monthlyFigures] of propertyMap) {
      const chart: ChartDTO = convert(propertyId, monthlyFigures);
      charts.push(chart);
    }
   
    res.json(charts);
  } catch (error) {
    next(error);
  }
}