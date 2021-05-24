function amIAvailable() {
    const day1 = new Date()
    day1.setDate(day1.getDate() + 1)
    let dayOne = day1.toDateString()


    const tomorrow = new Date(dayOne)
    tomorrow.setDate(tomorrow.getDate() + 1);
    let day2 = tomorrow.toDateString()


    const tomorrow2 = new Date(day2)
    tomorrow2.setDate(tomorrow2.getDate() + 1);
    let day3 = tomorrow2.toDateString()


    const tomorrow3 = new Date(day3)
    tomorrow3.setDate(tomorrow3.getDate() + 1);
    let day4 = tomorrow3.toDateString()


    const tomorrow4 = new Date(day4)
    tomorrow4.setDate(tomorrow4.getDate() + 1);
    let day5 = tomorrow4.toDateString()


    const tomorrow5 = new Date(day5)
    tomorrow5.setDate(tomorrow5.getDate() + 1);
    let day6 = tomorrow5.toDateString()


    const tomorrow6 = new Date(day6)
    tomorrow6.setDate(tomorrow6.getDate() + 1);
    let day7 = tomorrow6.toDateString()



    daysOfWeek = [dayOne, day2, day3, day4, day5, day6, day7];


    let avail = []

    daysOfWeek.forEach((x) => {
        let id = x.slice(0, 3);


        if (!(id == 'Sat' || id == 'Sun')) {

            avail.push(x)

        }

    });


    return avail
};

module.exports = amIAvailable;
