import moment from "moment";
import { getAllPropertyPeriods } from "../../db/paymentPeriod";
import { PropertyPeriodDBO } from "../../models/PropertyPeriod";
import { daysInMonth } from "../../helpers";
import { PropertyExpensesDBO } from "../../models/PropertyExpenses";
import { getPropertyExpenses } from "../../db/propertyExpenses";
import { ADMIN_USER_ID } from ".";
import { ChartDTO } from "../../data-transfer-models";

export async function handleGetCharts(req, res, next) {
  console.log('handleGetCharts');

  const userId = ADMIN_USER_ID || req.params.userId

  try {
    const propertyPeriods: PropertyPeriodDBO[] = await getAllPropertyPeriods();
    const propertyExpenses: PropertyExpensesDBO[] = await getPropertyExpenses(userId);
    
    // use expenses as well for 
    const chart: ChartDTO = generateChart(propertyPeriods);

    res.json(chart);
  } catch (error) {
    next(error);
  }
}

function generateChart(propertyPeriods: PropertyPeriodDBO[]): ChartDTO {
  // format data for chart.js
// formatted names for months & years in sequence order
// monthly income in seqeuence order

const {property_id: specificPropId} = propertyPeriods[100];

const specificPropertyPeriods: PropertyPeriodDBO[] = propertyPeriods.filter(({property_id}) => property_id === specificPropId);
// for each property, set up it's own chart. let's start from a single property

// sort property periods by years and months
specificPropertyPeriods.sort((a, b) => {
  if (a.year !== b.year) {
    return a.year - b.year;
  }
  else {
    return a.month - b.month;
  }
})

// console.log(specificPropertyPeriods.map(p => ({year: p.year, month: p.month})));
const chart: ChartDTO = {
  propertyId: specificPropId,
  labels: [],
  incomes: [],
  monthlyExpenses: null,
  oneTimeExpenses: null,
  mortgageExpenses: null,
}

// iterate
specificPropertyPeriods.forEach(propertyPeriod => {
  // push them into labels, combine year and month to a single coherent name with moment
  const {year, month, nightly_price, occupancy_rate} = propertyPeriod;
  const periodLabel = moment({year, month: month-1}).format("MMM YY");
  chart.labels.push(periodLabel);

  // push income, calc by multiplying
  const numOfDays: number = daysInMonth(year, month);
  const periodIncome = Math.trunc(numOfDays * occupancy_rate * nightly_price);
  chart.incomes.push(periodIncome);
});

return chart;
}