import { StyleProp, TextStyle } from "react-native";



type GlobalColors = {
    primary: (opacity ?: number) => string;
    secondary: (opacity ?: number) => string;
    success: (opacity ?: number) => string;
    danger: (opacity ?: number) => string;
    warning: (opacity ?: number) => string;
    info: (opacity ?: number) => string;
    blackLeather: (opacity ?: number) => string;
    light: (opacity ?: number) => string;
};


export const colorsApp: GlobalColors = {
    primary: (opacity = 1) => `rgba(0, 193, 148, ${opacity})`,
    secondary: (opacity = 1) => `rgba(34, 211, 238, ${opacity})`,
    success: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
    danger: (opacity = 1) => `rgba(220, 38, 38, ${opacity})`,
    warning: (opacity = 1) => `rgba(251, 191, 36, ${opacity})`,
    info: (opacity = 1) => `rgba(103, 232, 249, ${opacity})`,
    blackLeather: (opacity = 1) => `rgba(5, 22, 64, ${opacity})`,
    light: (opacity = 1) => `rgba(153, 161, 183, ${opacity})`,
};



