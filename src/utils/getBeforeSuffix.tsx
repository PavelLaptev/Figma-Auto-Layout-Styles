const getBeforeSuffix = (str: string, checkSymbol: string) => {
  return str.substr(0, str.indexOf(checkSymbol));
};

export default getBeforeSuffix;
