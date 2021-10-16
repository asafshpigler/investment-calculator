import { ChartDTO } from "../../../data-transfer-models";
import { PropertyExpensesDBO } from "../../../db/models/PropertyExpenses";
import { PropertyPeriodDBO } from "../../../db/models/PropertyPeriod";
import * as db from "../../../db";
import { transformToChartFormat } from "./transformToChartFormat";
import { getPropertyMap } from "./getPropertyMap";
import { PropertyMap } from "./charts";
import { CustomRequest } from "../handlers";

export async function handleGetCharts(req: CustomRequest, res, next) {
  console.log('handleGetCharts');

  try {
    validateGetChartsInput(req);

    const charts: ChartDTO[] = await getCharts(req);
  
    res.json(charts);
  } catch (error) {
    next(error);
  }
}

function validateGetChartsInput(req: CustomRequest) {
  if (!req.session.user) {
    throw new Error('invalid get charts input');
  }
}

export async function getCharts(req: CustomRequest): Promise<ChartDTO[]> {
    // query: get properties income
    const periods: PropertyPeriodDBO[] = await getAllPropertyPeriods(req);

    // query: get properties expenses
    const userId = req.session.user.id;
    const expenses: PropertyExpensesDBO[] = await db.getPropertiesExpenses(userId);
    
    // group: incomes & expenses by property id
    const propertyMap: PropertyMap = getPropertyMap(periods, expenses);

    // transform: property data to chart friendly format
    const charts: ChartDTO[] = [];
    for (const [propertyId, monthlyFigures] of propertyMap) {
      const chart: ChartDTO = transformToChartFormat(propertyId, monthlyFigures);
      charts.push(chart);
    }

    return charts;
}

export async function getChart(req: CustomRequest, propertyId: number): Promise<ChartDTO> {
  // query: get property income
  const periods: PropertyPeriodDBO[] = getSinglePropertyPeriods(req, propertyId);

  // query: get a single property expenses
  const userId = req.session.user.id;
  const expenses: PropertyExpensesDBO = await db.getPropertyExpenses(userId, propertyId);

  // group: incomes & expenses by property id
  const propertyMap: PropertyMap = getPropertyMap(periods, [expenses]);

  // transform: property data to chart friendly format
  const chart: ChartDTO = transformToChartFormat(propertyId, propertyMap.get(propertyId));

  return chart;
}

async function getAllPropertyPeriods(req: CustomRequest) {
  // retrieve from session
  if (req.session.propertyPeriods) {
    return req.session.propertyPeriods;
  }

  // cache for additional requests
  else {
    const propertyPeriods: PropertyPeriodDBO[] = await db.getAllPropertyPeriods();
    req.session.propertyPeriods = propertyPeriods;
    return propertyPeriods;
  }
}

function getSinglePropertyPeriods(req: CustomRequest, propertyId: number): PropertyPeriodDBO[] {
  const propertyPeriods: PropertyPeriodDBO[] = req.session.propertyPeriods;
  return propertyPeriods.filter(p => p.property_id === propertyId);
}