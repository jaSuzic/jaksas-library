import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';
import * as _moment from 'moment';

const moment = _moment;

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
    override format(date: Date, displayFormat: Object): string {
        if (displayFormat === "input") {
            return moment(date).format("DD / MM / YYYY");
        } else if (displayFormat === "monthYear") {
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
