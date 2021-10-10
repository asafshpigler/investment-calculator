import moment from "moment";
import { getAllPropertyPeriods } from "../db/paymentPeriod";
import { PropertyPeriodDBO } from "../models/PropertyPeriod";
import { getUser, insertUser } from "../db/user";
import { UserDBO } from "../models/User";
import { daysInMonth } from "../helpers";

// Wrapper functions

export async function handleSignupRequest(req, res, next) {
  const { userName } = req.body;

  try {
    const user: UserDBO = await signUp(userName);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function handleLoginRequest(req, res, next) {
  const { userName } = req.body;

  try {
    const user: UserDBO = await login(userName);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

// interface PropertyPeriodDTO {
//   propertyId: number;
//   incomePerMonths: IncomePerMonth[];
// }

// interface IncomePerMonth {
//   year: number;
//   month: number;
//   income: number;
// }

interface ChartDTO {
  propertyId: number;
  labels: string[];
  incomes: number[];
  monthlyExpenses: number[];
  oneTimeExpenses: number[];
  mortgageExpenses: number[];
}

export async function handleGetCharts(req, res, next) {
  console.log('handleGetCharts');

  try {
    const propertyPeriods: PropertyPeriodDBO[] = await getAllPropertyPeriods();
    const chart: ChartDTO = convertToChartDTO(propertyPeriods);

    res.json(chart);
  } catch (error) {
    next(error);
  }
}

// Actual server logic

async function signUp(userName: string): Promise<UserDBO> {
  const isUserExists: boolean = !!await getUser(userName);

  if (isUserExists) {
    throw new Error('User already exists');
  }

  const newUser: UserDBO = await insertUser(userName);
  return newUser;
}

async function login(userName: string): Promise<UserDBO> {
  const user = await getUser(userName);

  if (!user) {
    throw new Error('User doesn\'t exist')
  }

  return user;
}

function convertToChartDTO(propertyPeriods: PropertyPeriodDBO[]): ChartDTO {
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