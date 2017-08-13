import moment from 'moment';

import { TehranMainTrafficSpecification } from '.';

export class TehranEvenOddTrafficSpecification {

  isCurrentTimeBetweenForbiddenTime():boolean {
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

  isAllowedToday(val: string):boolean {
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

  static blockedAreaPoints():string {
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
      [35.750204207, 51.386184096], // Hemat - Chamran
      [35.751074925, 51.396811008],
      [35.751196824, 51.404256820],
      [35.751336138, 51.410007476],
      [35.752093652, 51.413719654],
      [35.752119773, 51.415661573],
      [35.750230329, 51.420168684],
      [35.749298651, 51.422624588],
      [35.749133212, 51.424866914],
      [35.749263822, 51.436014175],
      [35.750587324, 51.441078186],
      [35.751388380, 51.448245048],
      [35.755706981, 51.455926895],
      [35.756821421, 51.465539932],
      [35.757030376, 51.472921371],
      [35.759189553, 51.479973657],
      [35.758771652, 51.484894752],  // Hemat - Emam Ali
      [35.752537708, 51.485624313],
      [35.746407768, 51.483478546],
      [35.744979703, 51.483135223],
      [35.741426844, 51.484122276],
      [35.737090051, 51.482985019],
      [35.734982528, 51.482491493],
      [35.730053146, 51.478242874],
      [35.724391818, 51.471698284],
      [35.719705676, 51.463351249],
      [35.716447860, 51.458330154],
      [35.715245745, 51.457300186],
      [35.712824038, 51.456570625],
      [35.704669835, 51.457729339],
      [35.696933026, 51.456956863],
      [35.695172971, 51.456613540],
      [35.690258553, 51.457214355], // Emam Ali - Pirozi
      [35.688097508, 51.457493305],
      [35.684454968, 51.459681987],
      [35.682624921, 51.460261344],
      [35.677151958, 51.459167003],
      [35.674241026, 51.460626125],
      [35.670440967, 51.464467048],
      [35.668383979, 51.465046405],
      [35.665803952, 51.464209556],
      [35.658987400, 51.460926532],
      [35.654279979, 51.460926532],
      [35.642789219, 51.463651657], // Emam Ali - Besat
      [35.644323740, 51.459724903],
      [35.645300239, 51.454875469],
      [35.645509487, 51.450433731],
      [35.644881741, 51.441979408],
      [35.645927982, 51.430220603],
      [35.647915801, 51.412453651],
      [35.649240987, 51.398119926],  // Bahman square
      [35.645195615, 51.393270492],
      [35.650077935, 51.388549804],
      [35.654820475, 51.381554603],
      [35.664409309, 51.381897926],
      [35.680585676, 51.380310058],
      [35.700696973, 51.378121376],  // Azadi street
      [35.705506202, 51.377735137],
      [35.719583728, 51.378378868],
      [35.727910598, 51.383142471],
      [35.742541483, 51.383743286],  // Hakim - Chamran
      [35.747104376, 51.385931968],
      [35.750204207, 51.386184096]  // Last point = First point
    ];
  }

}