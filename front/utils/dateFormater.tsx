import { format } from "date-fns";
import { pl } from "date-fns/locale";

export function dateFormater(date: number, noHours?: boolean) {
  {
    const formatedDate = format(
      date,
      noHours ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm",
      {
        locale: pl,
      }
    );
    return formatedDate;
  }
}
