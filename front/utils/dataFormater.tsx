import { format } from "date-fns";

export function dataFormater(date: number) {
  {
    const formatedDate = format(date, "yyyy-MM-dd");
    return formatedDate;
  }
}
