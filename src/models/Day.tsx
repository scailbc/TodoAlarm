enum Day {
    any = 0,
    monday = 1,
    tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5,
    saturday = 6,
    sunday = 7,
    workweek = 8,
    weekend = 9,
}

export const workweek: Day[] = [Day.monday, Day.tuesday, Day.wednesday, Day.thursday, Day.friday];
export const weekend: Day[] = [Day.saturday, Day.sunday];
export const allDays: Day[] = workweek.concat(weekend);

export function isWorkweek( day: Day ) {
    // @ts-ignore
    return workweek.includes(day);
}

export function isWeekend( day: Day ) {
    // @ts-ignore
    return weekend.includes(day);
}

export default Day;
