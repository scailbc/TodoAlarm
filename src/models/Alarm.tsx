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

    constructor(name: string) {
        this.name = name;
    }

    equals(o: any) {
        return o instanceof Alarm && o.id === this.id;
    }
}