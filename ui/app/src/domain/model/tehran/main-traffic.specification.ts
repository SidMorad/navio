import moment from 'moment';

export class TehranMainTrafficSpecification {

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
      if (moment().isBetween(moment('6:30am', 'h:mma'), moment('17:00pm', 'h:mma'))) {
        return true;
      }
    }
    return false;
  }

  static isTodayAHoliday():boolean {
    let today = moment();
    for (let holiday of TehranMainTrafficSpecification.iran1396Holidays()) {
      if (today.isSame(holiday, 'day')) {
        return true;
      }
    }
    return false;
  }

  // TODO
  // FIXME before 1397!
  //
  static iran1396Holidays() {
    return [
      "2017-06-26",
      "2017-06-27",
      "2017-07-20",
      "2017-09-09",
      "2017-09-30",
      "2017-10-01",
      "2017-11-09",
      "2017-11-19",
      "2017-12-06",
      "2018-02-11",
      "2018-02-20",
      "2018-03-20"
    ];
  }

  static blockedAreaPoints():string {
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
      [35.714217835, 51.389386653], // Fatemi - Kargar
      [35.718155181, 51.400651931],
      [35.720959986, 51.408591270],
      [35.723642750, 51.410307884],
      [35.723834373, 51.416401863],
      [35.724095675, 51.425006389],
      [35.724478918, 51.437644958],
      [35.723869213, 51.440970897],
      [35.717893859, 51.439039707],
      [35.717353790, 51.440563201],
      [35.709809868, 51.435971260],
      [35.706359984, 51.433460712],
      [35.706900128, 51.440520286], // Sepah square
      [35.700418168, 51.438009738],
      [35.699302939, 51.437301635],
      [35.699024129, 51.438224315],
      [35.701916732, 51.448116302], // Emam Hosein square
      [35.689666014, 51.447279453], // Shohada square
      [35.673596075, 51.446206569],
      [35.660783121, 51.445198059], // East - South corner
      [35.659545299, 51.435155868],
      [35.659684773, 51.430907249], // Shosh square
      [35.658534105, 51.412582397],
      [35.658115677, 51.409621238],
      [35.658098242, 51.407389640],
      [35.659057138, 51.397926807],
      [35.661358441, 51.396446228],
      [35.666902217, 51.395673751], // Razi square
      [35.675164866, 51.394472122], // Ghazvin square
      [35.688114936, 51.392776966], // Hor square
      [35.690798805, 51.392540931], // Pastor square
      [35.700888651, 51.391232013], // Enghelab square
      [35.712353626, 51.389665603],
      [35.714217835, 51.389386653]  // Last point = First point
    ];
  }
}