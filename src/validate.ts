import { Dispatch } from "react";

interface Field {
  type: string;
  value: string | boolean | number | Dispatch<any>;
  callback: Dispatch<any>;
}

interface TFields {
  [key: string]: new (...args: any[]) => UserNameValidator | RoomIdValidator;
}

interface UserNameValidator {
  value: string;
  minLength: number;
  maxLength: number;
  regexp: RegExp;
}

interface RoomIdValidator {
  value: string;
}

abstract class Validator {
  abstract isInvalid(): void;

  isLengthValid(str: string, min: number = 1, max: number = str.length) {
    return str.length >= min && str.length <= max;
  }

  isRegexpValid(str: string, regexp: RegExp) {
    return str.match(regexp);
  }

  isNotEmpty(val: any) {
    return val || (typeof val === "string" && val.trim().length);
  }

  testByFunction(val: any, callback: (val: any) => boolean) {
    return callback(val);
  }
}

class UserNameValidator extends Validator {
  constructor(value: string) {
    super();
    this.value = value;
    this.minLength = 3;
    this.maxLength = 10;
    this.regexp = /[a-zA-Zа-яА-Я0-9_]/;
  }

  isInvalid() {
    if (!this.isNotEmpty(this.value)) {
      return { content: "Name is required" };
    }

    if (!this.isRegexpValid(this.value, this.regexp)) {
      return {
        content:
          "Name must contain alphanumerical characters and underscore only"
      };
    }

    if (!this.isLengthValid(this.value, this.minLength, this.maxLength)) {
      return {
        content: `Name length must between ${this.minLength} and ${this.maxLength}`
      };
    }

    if (!this.testByFunction(this.value, val => val.match(/[а-яА-Яa-zA-Z]+/))) {
      return {
        content: `Name must contain at least one letter`
      };
    }

    return false;
  }
}

class RoomIdValidator extends Validator {
  static uuidRegexp = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;

  constructor(value: string) {
    super();
    this.value = value;
  }

  isInvalid() {
    if (!this.isNotEmpty(this.value)) {
      return { content: "Room id is required" };
    }

    if (!this.isRegexpValid(this.value, RoomIdValidator.uuidRegexp)) {
      return {
        content: "Room id is not valid"
      };
    }

    return false;
  }
}

const fieldTypes: TFields = {
  userName: UserNameValidator,
  roomId: RoomIdValidator
};

export default (fields: Field[], labelPosition: string = "above") => {
  let error = false;

  fields.forEach((field: Field) => {
    if (fieldTypes[field.type]) {
      const validator = new fieldTypes[field.type](field.value);
      const validationError = validator.isInvalid();

      if (validationError) {
        field.callback({ ...validationError, pointing: labelPosition });
        error = true;
      }
    } else {
      throw new Error("Unknown field");
    }
  });

  return error;
};
