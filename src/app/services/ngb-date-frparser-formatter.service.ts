import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class NgbDateFRParserFormatterService extends NgbDateParserFormatter {
	readonly DT_FORMAT = 'DD/MM/YYYY';

	parse(value: string): NgbDateStruct {
		if (value) {
			value = value.trim();
			const mdt = moment(value, this.DT_FORMAT);
		}
		return null;
	}
	format(date: NgbDateStruct): string {
		if (!date) { return ''; }
		const mdt = moment([date.year, date.month - 1, date.day]);
		if (!mdt.isValid()) { return ''; }
		return mdt.format(this.DT_FORMAT);
	}
}
