import fs from "fs";
import csv from "csv-parser";

export class TestCase {
  ntc: string = "";
}
export class CustomerFormFill extends TestCase {
  first_name: string = "";
  last_name: string = "";
  gender: string = "";
  birth: string = "";
  address: string = "";
  email: string = "";
  password: string = "";
  company: string = "";
  role: string = "";
}

export class CustomerFormFillData {
  static async import(pathFile: string) {
    return new Promise((resolve, reject) => {
      const results: CustomerFormFill[] = [];
      return fs
        .createReadStream(pathFile)
        .pipe(csv())
        .on("data", (data) => results.push(data as CustomerFormFill))
        .on("end", () => resolve(results));
    });
  }
}
