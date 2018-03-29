export const makeActionCreator = (type, ...actionPropertiesNames) => (...actionPropertiesValues) =>
    actionPropertiesNames.reduce((action, item, index) => {
        action[item] = actionPropertiesValues[index];
        return action;
    }, { type });

// export const makeActionCreator = (type, ...actionPropertiesNames) => (...actionPropertiesValues) => {
//     let action = { type };
//     actionPropertiesNames.forEach((arg, index) => {
//         action[actionPropertiesNames[index]] = actionPropertiesValues[index];
//     });
//     console.log('I created this action with forEach: ', action);
//     return action;
// };
