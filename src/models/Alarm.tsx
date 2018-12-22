import Day from "./Day";

import ObjectID from "bson-objectid";

export default class Alarm {

    /** Univoque identifier */
    id: string = ObjectID.generate();
    name: string;

    hour: number;
    minute: number;
    /** When to repeat the alarm */
    repeat: Day[];

    static fromJson(alarm: any): Alarm {
        let a = new Alarm(alarm.name);
        a.id = alarm.id;
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

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            hour: this.hour,
            minute: this.minute,
            repeat: this.repeat,
        };
    }

    getTimeString(): string {
        return `${this.hour}:${this.minute}`;
    }
}