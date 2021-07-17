import dayjs from 'dayjs';
dayjs.locale('ja');

export const splitBySlash = (date: string) => dayjs(date).format('YYYY/MM/DD');
