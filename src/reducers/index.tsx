import AlarmReducer from "./AlarmReducer";

import Alarm from "../models/Alarm";

import storage from "redux-persist/lib/storage"; // for React Native return the AsyncStorage
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; // Allow to safely add new variables with new versions of the app
import { createTransform, persistReducer, Transform } from "redux-persist"; // Allow to persist only a part of the store

const alarmTransform: Transform<any, any> = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState: any, key: string) => {
        switch (key) {
            case "alarms":
            // convert alarms to an Array of json.
            return inboundState ? inboundState.map((a: Alarm) => a.toJson()) : inboundState;

            default:
            return inboundState;
        }
    },
    // transform state being rehydrated
    (outboundState: any, key: string) => {
        switch (key) {
            case "alarms":
            return outboundState ? outboundState.map((a: any) => Alarm.fromJson(a)) : outboundState;

            default:
            return outboundState;
        }
    },
    // define which reducers this transform gets called for.
    { whitelist: ["alarms"] },
);

/** Select the values to persist inside AlarmReducer */
const alarmPersistConfig = {
    key: "alarm", // the key for the persist
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ["alarms"],
    transforms: [alarmTransform],
    timeout: 5000,
};

export default {
    alarm: persistReducer(alarmPersistConfig, AlarmReducer),
};