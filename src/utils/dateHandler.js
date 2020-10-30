export const dateHandler = date => {
    const dateObj = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }
    const dateStr = date.toString();
    const day = dateStr.substring(6)
    const year = dateStr.substring(0,4)
    const month = dateStr.substring(4, 6)
    return `${dateObj[month]} ${day}, ${year}`
    

}