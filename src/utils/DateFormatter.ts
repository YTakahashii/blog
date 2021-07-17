import dayjs from 'dayjs';
dayjs.locale('ja');

export class DateFormatter {
  static splitBySlash = (date: string) => dayjs(date).format('YYYY/MM/DD');
}
