// check if object is empty
export const isEmptyObject = input => {
  for (var key in input) {
    if (input.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
};

// check if array is empty
export const isEmptyArray = input => {
  return !Array.isArray(input) || !input.length;
};
