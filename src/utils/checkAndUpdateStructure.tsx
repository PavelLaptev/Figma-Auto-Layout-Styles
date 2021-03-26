const checkAndUpdateStructure = file => {
  file.layouts.forEach((item: LayoutTypes) => {
    if (!item.hasOwnProperty("fold")) {
      item.fold = false;
    }
  });

  return file;
};

export default checkAndUpdateStructure;
