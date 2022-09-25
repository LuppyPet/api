interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  dateNowFormatted(): string;
  dateFormatedToLL(date: Date): string;
  compareInDays(start_date: Date, end_date: Date): number;
  formatDate(date: Date): string;
  addSeconds(seconds: number): Date;
  addMinutes(minutes: number): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
