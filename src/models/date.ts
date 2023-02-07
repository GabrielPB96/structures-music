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
  "Diciembre"
];
export class CustomDate {
  private _day?: number;
  private _month?: number;
  private _year?: number;
  private _format: string;
  private nowDate: Date;
  constructor(day?: number, month?: number, year?: number) {
    this.nowDate = new Date();
    this._day = day || this.nowDate.getDate();
    this._month = month || this.nowDate.getMonth();
    this._year = year || this.nowDate.getFullYear();
  }
  public get format(): string {
    let res: string = `${this._day} de ${Months[this._month - 1]}`;
    if (this._year !== this.nowDate.getFullYear()) {
      res += ` de ${this._year}`;
    }
    return res;
  }
}
