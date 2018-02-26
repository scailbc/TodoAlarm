import { ALARM } from "./ActionTypes";

import I18n from "../res/i18n/I18n";

import * as Redux from "redux";
import { ThunkAction } from "redux-thunk";

/**
 * Delete the alarm at the given index from the list.
 * It use javascript splice:  If greater than the length of the array,
 * actual starting index will be set to the length of the array. If negative,
 * will begin that many elements from the end of the array (with origin -1)
 * and will be set to 0 if absolute value is greater than the length of the array.
 * @param {number} index the index of the alarm in the list to remove
 */
export function deleteAlarmAt(index: number): Redux.AnyAction {
    return {
        type: ALARM.DELETE_AT,
        payload: index,
    };
}

/**
 * Delete the given alarm from the list
 * @param alarm the alarm in the list to remove
 */
export function deleteAlarm(alarm: any): ThunkAction<void, Function, void> {
    return ( dispatch: Redux.Dispatch<any>, getState: Function) => {
        let index = getState().alarm.alarms.indexOf(alarm);
        dispatch(deleteAlarmAt(index));
    };
}

/**
 * Set the whole list of alarms
 * @param alarms the new alarms list
 */
export function setAlarms( alarms: Array<any> ): Redux.AnyAction {
    return {
        type: ALARM.SET,
        payload: alarms,
    };
}