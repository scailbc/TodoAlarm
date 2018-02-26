import { ALARM } from "../actions/ActionTypes";

const INITIAL_STATE = {
    alarms: [],
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {

        case ALARM.DELETE_ALL:
            // delete all the alarms
            return {
                ...state,
                alarms: [],
            };

        case ALARM.DELETE_AT:
            // delete the alarm at the given index
            state.alarms.splice(action.payload, 1);
            return {
                ...state,
                alarms: state.alarms,
            };

        case ALARM.SET:
            // set all the alarms
            return {
                ...state,
                alarms: action.payload,
            };

        default:
            return state;
    }
}