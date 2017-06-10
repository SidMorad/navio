import * as moment from 'moment';

export class TehranMainTrafficSpecification {

  isCurrentTimeBetweenForbiddenTime() {
    if (moment().isoWeekday() === 5) {        // Firday, no restriction
      return false;
    } else if (moment().isoWeekday() === 4){  // Thursday
      if (moment().isBetween(moment('6:30am', 'h:mma'), moment('13:00pm', 'h:mma'))) {
        return true;
      }
    } else {                                  // Other days
      if (moment().isBetween(moment('6:30am', 'h:mma'), moment('17:00pm', 'h:mma'))) {
        return true;
      }
    }
    return false;
  }

  static blockedAreaPoints() {
    return TehranMainTrafficSpecification.rectanglePoints().join();
  }

  static rectanglePoints() {
    return [
      [35.72397, 51.38768],
      [35.65780, 51.44781]
    ];
  }

  static polygonPoints() {
    return [
      [35.71452, 51.38897],
      [35.72118, 51.40765],
      [35.72404, 51.41006],
      [35.72465, 51.43761],
      [35.72407, 51.44107],
      [35.71779, 51.43946],
      [35.71731, 51.44085],
      [35.70698, 51.43485],
      [35.70710, 51.44101],
      [35.69958, 51.43884],
      [35.70202, 51.44871],
      [35.66032, 51.44612], // طیب
      [35.65649, 51.40909], // شوش
      [35.65846, 51.39509], // انتهای کارگر جنوبی
      [35.71346, 51.38765]  // ابتدای کارگر جنوبی
    ];
  }
}