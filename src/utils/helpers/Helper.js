class Helper {
  formData(formData) {
    let data = new FormData();
    for (let key in formData) {
      if (formData[key] === null) formData[key] = "";
      data.append(key, formData[key]);
    }
    return data;
  }

  stringify(object) {
    for (let key in object) {
      if (typeof object[key] === "object")
        object[key] = JSON.stringify(object[key]);
    }
    return object;
  }

  getFileIconColor(fileName) {
    if (!fileName) return "#727071";
    let fileExtension = fileName.split(".").pop();
    switch (fileExtension) {
      case "docx":
        return "#0276c0";
      case "pdf":
        return "#e62f34";
      case "pptx":
        return "#f39301";
      case "xls":
        return "#82bd8d";
      case "xlsx":
        return "#82bd8d";
      case "png":
        return "#a7ce59";
      case "jpg":
        return "#a7ce59";
      default:
        return "#727071";
    }
  }

  getFileIcon(fileName) {
    if (!fileName) return "fa fa-file-o";
    let fileExtension = fileName.split(".").pop();
    switch (fileExtension) {
      case "docx":
        return "fa fa-file-word";
      case "pdf":
        return "fa fa-file-pdf";
      case "pptx":
        return "fa fa-file-powerpoint";
      case "xls":
        return "fa fa-file-excel";
      case "xlsx":
        return "fa fa-file-excel";
      case "png":
        return "fa fa-file-image";
      case "jpg":
        return "fa fa-file-image";
      default:
        return "fa fa-file";
    }
  }
}
export default new Helper();
