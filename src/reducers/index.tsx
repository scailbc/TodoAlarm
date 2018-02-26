import AlarmReducer from "./AlarmReducer";

import storage from "redux-persist/lib/storage"; // for React Native return the AsyncStorage
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; // Allow to safely add new variables with new versions of the app
import { persistReducer } from "redux-persist"; // Allow to persist only a part of the store

/** Select the valus to persist inside AlarmReducer */
const alarmPersistConfig = {
    key: "alarm", // the key for the persist
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ["alarms"],
};

export default {
    alarm: persistReducer(alarmPersistConfig, AlarmReducer),
};