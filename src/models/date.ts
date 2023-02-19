const Months = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];
export class CustomDate {
	private _day?: number;
	private _month?: number;
	private _year?: number;
	private _hours?: number;
	private _minutes?: number;
	private _seconds?: number;
	private nowDate: Date;
	constructor(day?: number, month?: number, year?: number) {
		this.nowDate = new Date();
		this._day = day || this.nowDate.getDate();
		this._month = month || this.nowDate.getMonth();
		this._year = year || this.nowDate.getFullYear();
		this._hours = this.nowDate.getHours();
		this._minutes = this.nowDate.getMinutes();
		this._seconds = this.nowDate.getSeconds();
	}
	public get formatDate(): string {
		let res: string = "0 de 0";
		if (this._month) {
			res = `${this._day} de ${Months[this._month - 1]} de ${this._year}`;
		}
		return res;
	}

	public get formatTime(): string {
		let res: string = "00:00:00";
		let hr, min, sec;
		if (this._hours && this._minutes && this._seconds) {
			hr = this.getFormatNumber(this._hours);
			min = this.getFormatNumber(this._minutes);
			sec = this.getFormatNumber(this._seconds);
			res = `${hr}:${min}:${sec}`;
		}
		return res;
	}

	private getFormatNumber(num: number): string {
		return num < 10 ? `0${num}` : `${num}`;
	}

	public get fullDate() {
		const date = this.formatDate,
			time = this.formatTime;
		return `${date} ${time}`;
	}
}
