import { differenceInCalendarMonths, parse } from 'date-fns';

//Calculate the duration of experience
export default function Duration(dateArr: string){
  let arr: string[] = dateArr.split(" - ");
  let start: any = parse(arr[0], 'LLLL yyyy', new Date());
  let end: any = new Date();
  if (arr.length === 1) {
    return "1 month";
  }
  else {
    if (arr[1] != "PRESENT"){
      end = parse(arr[1], 'LLLL yyyy', new Date());
    }
    let diff: number = differenceInCalendarMonths(end, start)+1;
    let year: number = Math.floor(Math.round(diff/12));
    let month: number = diff%12;
    if (month >= 6 && diff <= 12) {
      year = 0;
    } 
    return `${year != 0 ? year : ''} ${year == 1 ? 'year' : year == 0 ? '' : 'years'} ${month != 0 ? month : ''} ${month == 1 ? 'month' : month != 0 ? 'months' : ''}`;
  }
}