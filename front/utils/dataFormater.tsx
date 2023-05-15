import { format } from "date-fns";
import { pl } from "date-fns/locale";

export function dataFormater(date: number, minutes?: boolean) {
  {
    const formatedDate = format(
      date,
      minutes ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd",
      {
        locale: pl,
      }
    );
    return formatedDate;
  }
}
