 const longerStringLength =
    string1.length > string2.length ? string1.length : string2.length;
  const strings = [string1, string2].map((item) =>
    item.padStart(longerStringLength, "0").split("").reverse()
  );