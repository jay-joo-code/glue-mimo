import { add, set } from "date-fns"

const tomorrow = set(
  add(new Date(), {
    days: 1,
  }),
  {
    hours: 5,
    minutes: 0,
    seconds: 0,
  }
)

const nextWeek = set(
  add(new Date(), {
    weeks: 1,
  }),
  {
    hours: 5,
    minutes: 0,
    seconds: 0,
  }
)

const nextMonth = set(
  add(new Date(), {
    months: 1,
  }),
  {
    hours: 5,
    minutes: 0,
    seconds: 0,
  }
)

const nextThreeYears = set(
  add(new Date(), {
    years: 3,
  }),
  {
    hours: 5,
    minutes: 0,
    seconds: 0,
  }
)

const spaceByToAvailFrom = {
  daily: tomorrow,
  weekly: nextWeek,
  monthly: nextMonth,
  archived: nextThreeYears,
}

export default spaceByToAvailFrom
