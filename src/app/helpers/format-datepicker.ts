import { NativeDateAdapter } from '@angular/material';
import { MatDateFormats } from '@angular/material/core';
import * as _moment from 'moment';

const moment = _moment;

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === "input") {
      // let day: string = date.getDate().toString();
      // day = +day < 10 ? "0" + day : day;
      // let month: string = (date.getMonth() + 1).toString();
      // month = +month < 10 ? "0" + month : month;
      // let year = date.getFullYear();
      // return `${day} / ${month} / ${year}`;
      return moment(date).format("DD / MM / YYYY");
    } else if (displayFormat === "monthYear") {
      // let month: string = (date.getMonth() + 1).toString();
      // month = +month < 10 ? "0" + month : month;
      // let year = date.getFullYear();
      // return `${month} / ${year}`;
      return moment(date).format("MMM / YYYY");
    }
    return date.toDateString();
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: "short", year: "numeric", day: "numeric" }
  },
  display: {
    dateInput: "input",
    monthYearLabel: "monthYear",
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" }
  }
};
