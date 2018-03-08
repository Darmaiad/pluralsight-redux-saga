// TODO: Use map to make it more terse
export const makeActionCreator = (type, ...actionPropertiesNames) => (...actionPropertiesValues) => {
    let action = { type };
    actionPropertiesNames.forEach((arg, index) => {
        action[actionPropertiesNames[index]] = actionPropertiesValues[index];
    });
    return action;
};
