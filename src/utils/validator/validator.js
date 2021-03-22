/* eslint-disable */

import { helper } from "../index";

class Validator {
  constructor() {}

  field(field) {
    return field ? field.length !== 0 : false;
  }

  isEmptyObject(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  validate(object, rules, error) {
    //todo implement same as field for passwords
    let hasErrors = false;
    for (let key in object) {
      if (rules[key]) {
        let result = this.validateFields(rules[key], object[key]);
        if (result.message.length !== 0) {
          error[key] = result;
          hasErrors = true;
        } else {
          error[key] = { valid: null, message: "" };
        }
      }
    }
    return { hasErrors: hasErrors, errors: error };
  }

  validateFields(rules, field) {
    let res = { valid: null, message: "" };
    let rule = "";

    if (rules.includes("|")) {
      rule = rules.split("|");
      for (let key in rule) {
        let ruleCheck = this.checkRule(rule[key], field);
        if (!helper.isEmpty(ruleCheck)) {
          res.valid = ruleCheck.valid;
          res.message = ruleCheck.message;
        }
      }
    } else {
      let ruleCheck = this.checkRule(rules, field);
      if (!helper.isEmpty(ruleCheck)) {
        res.valid = ruleCheck.valid;
        res.message = ruleCheck.message;
      }
    }
    return res;
  }

  checkRule(rule, field) {
    let res = {
      valid: null,
      message: ""
    };
    let value;
    if (rule.includes(":")) {
      let arr = rule.split(":");
      rule = arr[0];
      value = parseInt(arr[1]);
    }

    switch (rule) {
      case "optional":
        // extra check i.e regex
        return res;
      case "required":
        if (!this.field(field)) {
          return {
            valid: false,
            message: "must have a value"
          };
        }
        return res;
      case "string":
        if (!field) return res;
        if (!typeof field === "string" || !(field instanceof String)) {
          return {
            valid: false,
            message: "not a string"
          };
        }
        return res;
      case "min":
        if (!field) return res;
        if (field.length < value) {
          return {
            valid: false,
            message: "must have a minimum of " + value + " characters"
          };
        }
        return res;

      case "max":
        if (!field) return res;
        if (field.length > value) {
          return {
            valid: false,
            message: "must have a maximum of " + value + " characters"
          };
        }
        return res;

      case "size":
        if (!field) return res;
        if (field.length !== value) {
          return {
            valid: false,
            message: "must have " + value + " characters"
          };
        }
        return res;

      case "numeric":
        if (!field) return res;
        if (typeof field !== "number" && field % 1 !== 0) {
          return {
            valid: false,
            message: "not a number"
          };
        }
        return res;

      case "lt":
        if (!field) return res;
        if (field > value) {
          return {
            valid: false,
            message: "cannot exceed " + value
          };
        }
        return res;

      case "gt":
        if (!field) return res;
        if (field <= value) {
          return {
            valid: false,
            message: "cannot be less than or equal to" + value
          };
        }
        return res;

      case "email":
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(field)) {
          return {
            valid: false,
            message: "not a valid email"
          };
        }
        return res;

      case "bool":
        if (value !== field) {
          return {
            valid: false,
            message: "must be checked"
          };
        }

        return res;

      case "kra":
        if (field === "") return res;

        // eslint-disable-next-line no-case-declarations
        let pattern = /^[aApP].\d*.[a-zA-Z]$/;
        if (!pattern.test(field)) {
          return {
            valid: false,
            message: "not a valid kra Pin"
          };
        }
        return res;

      case "passport":
        return res;

      case "date":
        return res;

      case "url":
        return res;

      case "array":
        if (!Array.isArray(field) || field.length > 0) {
          return (res = {
            valid: false,
            message: "must have a value"
          });
        }
        return res;

      case "file":
        if (!(field instanceof File) || field.length > 0) {
          return (res = {
            valid: false,
            message: "must have a file"
          });
        }
        if (field.size >= 2000000) {
          return (res = {
            valid: false,
            message: "File is too big"
          });
        }
        return res;

      case "image":
        console.log(field);

        if (!(field instanceof File) || field.length > 0) {
          return (res = {
            valid: false,
            message: "must have a file"
          });
        }
        let file_ext = ["jpg", "jpeg", "png"];
        let image_name = field.name;
        console.log("image name");
        console.log(image_name);
        let ext = image_name.substring(image_name.lastIndexOf(".") + 1);
        let image_ext = ext.toLowerCase();
        console.log(image_ext);

        if (
          !(
            file_ext.includes(image_ext) ||
            !(field instanceof File) ||
            field.length > 0
          )
        ) {
          return (res = {
            valid: false,
            message: "must have an image file"
          });
        }
        if (field.size >= 2000000) {
          return (res = {
            valid: false,
            message: "Image is too big"
          });
        }
        console.log("response");
        return res;

      case "object":
        if (helper.isEmpty(field)) {
          return (res = {
            valid: false,
            message: "must have a value"
          });
        }
        return res;

      case "":
        return res;
    }

    return res;
  }
}

export default new Validator();
