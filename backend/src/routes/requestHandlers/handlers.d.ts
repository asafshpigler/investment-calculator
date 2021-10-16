import { Request } from "express";
import session from "express-session";
import { PropertyPeriodDBO } from "../../db/models/PropertyPeriod";
import { UserDBO } from "../../db/models/User";

export interface CustomRequest extends Request {
  session: (
    session.Session &
    Partial<session.SessionData> &
    CustomSessionProperties
  )
}

interface CustomSessionProperties {
  user: UserDBO;
  propertyPeriods: PropertyPeriodDBO[];
}