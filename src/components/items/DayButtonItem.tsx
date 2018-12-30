import React from "react";

// components
import I18n from "../../res/i18n/I18n";

// third party
import { Button, Icon, Text } from "native-base";

export default function DayButtonItem(props: any) {
    return (
        <Button small rounded transparent
            {...props}
            >
            {props.icon ?
                <Icon name={props.icon} />
                :
                <Text>{I18n.t(`days.${props.day}`).substring(0, 1)}</Text>
            }
        </Button>
    );
}