const getRandomKey = () => {
  const randomKey = Math.floor(Math.random() * 100000000).toString();
  return randomKey;
};

export default getRandomKey;
