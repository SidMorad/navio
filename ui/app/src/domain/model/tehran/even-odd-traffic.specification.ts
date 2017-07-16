import * as moment from 'moment';

import { TehranMainTrafficSpecification } from '.';

export class TehranEvenOddTrafficSpecification {

  isCurrentTimeBetweenForbiddenTime() {
    if (TehranMainTrafficSpecification.isTodayAHoliday()) {  // Holiday, no restriction
      return false;
    }
    if (moment().isoWeekday() === 5) {                       // Firday, no restriction
      return false;
    }
    if (moment().isoWeekday() === 4){                        // Thursday
      if (moment().isBetween(moment('6:30am', 'h:mma'), moment('13:00pm', 'h:mma'))) {
        return true;
      }
    } else {                                                 // Other days
      if (moment().isBetween(moment('6:30am', 'h:mma'), moment('19:00pm', 'h:mma'))) {
        return true;
      }
    }
    return false;
  }

  isAllowedToday(val: string) {
    if (TehranMainTrafficSpecification.isTodayAHoliday()) {  // Holiday, no restriction
      return true;
    }
    let weekDay = moment().isoWeekday();
    if (weekDay === 5) {                                     // Firday, no restriction
      return true;
    }
    if (!val || val === 'noset') {  // If we don't know car's plate number is even or odd, then not allowed!
      return false;
    }
    if (val === 'even') {
      if (weekDay === 6 || weekDay === 1 || weekDay === 3) {  // Saturday, Monday, Wendsday
        return true;
      }
    }
    if (val === 'odd') {
      if (weekDay === 7 || weekDay === 2 || weekDay === 4) {  // Sunday, Tuesday, Thursday
        return true;
      }
    }
    return false;
  }

  static blockedAreaPoints() {
    return TehranEvenOddTrafficSpecification.rectanglePoints().join();
  }

  static rectanglePoints() {
    return [
      [35.74716, 51.38786],
      [35.65183, 51.45461]
    ];
  }

  static polygonPoints() {
    return [
      [35.75113, 51.38468], // بزرگراه همت - چمران
      [35.75314, 51.41653],
      [35.74957, 51.42570],
      [35.75240, 51.44762],
      [35.75799, 51.46551],
      [35.75962, 51.48559],
      [35.73730, 51.48432], // تقاطع رسالت - امام علی
      [35.73392, 51.48231],
      [35.72407, 51.47183],
      [35.71410, 51.45739],
      [35.68988, 51.45759], // تقاطع پیروزی - امام علی
      [35.68198, 51.46047],
      [35.67596, 51.45944],
      [35.66947, 51.46483],
      [35.65761, 51.46222],
      [35.64151, 51.46417], // تقاطع بعثت - امام علی
      [35.64509, 51.45409],
      [35.64420, 51.44389],
      [35.64442, 51.43488],
      [35.64896, 51.39881],
      [35.64356, 51.39337],
      [35.65396, 51.38029],
      [35.70042, 51.37718], // تقاطع آزادی - با؟
      [35.71573, 51.37725],
      [35.72464, 51.38076], // شهید گمنام - چمران
      [35.72803, 51.38247],
      [35.74231, 51.38273], // بزرگراه حکیم - چمران
      [35.75113, 51.38468]  // Last point = First point
    ];
  }

}