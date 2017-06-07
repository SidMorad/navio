import * as moment from 'moment';

export class TehranMainTrafficSpecification {

  isCurrentTimeBetweenForbiddenTime() {
    if (moment().isoWeekday() === 5) {        // Firday, no restriction
      return false;
    } else {
      let start = moment('6:30am', 'h:mma');
      let end = moment('17:00pm', 'h:mma');
      if (moment().isBetween(start, end)) {
        return true;
      }
    }
    return false;
  }

}