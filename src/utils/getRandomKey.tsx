const getRandomKey = () => {
  const randomKey = Math.floor(Math.random() * 10000000).toString();
  return randomKey;
};

export default getRandomKey;
