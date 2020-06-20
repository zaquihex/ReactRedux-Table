//utility to update an object of the best way
export const updateObject = (oldObject,updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
      };
};