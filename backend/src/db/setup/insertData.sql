-- user 1

INSERT INTO
  public."user"(name)
VALUES
  ('asaf');

-- mortgage for user 1
INSERT INTO
  public.property_expenses(
    user_id,
    property_id,
    one_time_expenses,
    monthly_expenses,
    mortgage_expense
  )
VALUES
  (
    1,
    2096999,
    array ['{"amount": 200, "paymentDate": "2018-01-01"}','{"amount": 100, "paymentDate": "2018-02-01"}','{"amount": 400, "paymentDate": "2018-04-01"}','{"amount": 300, "paymentDate": "2018-05-01"}'] :: jsonb [],
    array ['{"amount": 600, "duration": 5, "startDate": "2018-01-01"}','{"amount": 450, "duration": 3, "startDate": "2019-01-01"}'] :: jsonb [],
    '{"type": "NORMAL", "startDate": "2018-04-04", "loanAmount": 10000, "paymentPeriods": [{"amount": 4000, "duration": 3}, {"amount": 4000, "duration": 6}, {"amount": 4000, "duration": 12}]}'
  );