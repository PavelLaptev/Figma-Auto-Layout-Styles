const download = (content, fileName, contentType) => {
  var a = document.createElement("a");
  var file = new Blob([JSON.stringify(content, null, 2)], {
    type: contentType
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export default download;
