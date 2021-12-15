export const checkDays = (dates) => {
    // console.log(dates);
    var date1 = new Date();
    var date2 = new Date(dates);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // console.log(Math.ceil(Difference_In_Days),'Difference_In_Days')
    return Math.ceil(Difference_In_Days);
  };
