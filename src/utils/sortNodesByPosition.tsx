const sortNodesByPosition = nodes => {
  var result = nodes.map(x => x);
  result.sort((current, next) => {
    return current.x - next.x;
  });
  return result.sort((current, next) => current.y - next.y);
};

export default sortNodesByPosition;
