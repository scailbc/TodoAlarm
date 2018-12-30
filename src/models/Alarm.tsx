import Day from "./Day";

import ObjectID from "bson-objectid";
import moment from "moment";

export default class Alarm {

    /** Univoque identifier */
    id: string = ObjectID.generate();
    name: string;
    enabled: boolean = true;

    hour: number = 0;
    minute: number = 0;
    /** When to repeat the alarm */
    repeat: Day[];

    static fromJson(alarm: any): Alarm {
        let a = new Alarm(alarm.name);
        a.id = alarm.id;
        a.enabled = alarm.enabled;
        a.hour = alarm.hour;
        a.minute = alarm.minute;
        a.repeat = alarm.repeat;
        return a;
    }

    constructor(name: string) {
        this.name = name;
    }

    equals(o: any): boolean {
        return o instanceof Alarm && o.id === this.id;
    }

    toDate(): Date {
        const now = new Date();
        const nextAlarm = new Date( now.getFullYear(), now.getMonth(), now.getDate(), this.hour, this.minute);
        if ( nextAlarm < now ) {
            nextAlarm.setDate( nextAlarm.getDate() + 1 );
        }
        return nextAlarm;
    }

    toJson(): any {
        return {
            id: this.id,
            enabled: this.enabled,
            name: this.name,
            hour: this.hour,
            minute: this.minute,
            repeat: this.repeat,
        };
    }

    getTimeString(): string {
        return this.toDate().toLocaleTimeString( undefined, {hour: "numeric", minute: "numeric" }).substring(0, 5);
    }

    /**
     * Set time from a time string
     * @param time in format "HH:mm"
     */
    setTime(time: string): void {
        const t = moment(time, "HH:mm");
        if ( t.isValid() ) {
            this.hour = t.hour();
            this.minute = t.minute();
        }
    }
}