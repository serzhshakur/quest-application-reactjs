export function calculateTime(secondsTotal) {
    const seconds = secondsTotal % 60;
    const minutesTotal = secondsTotal > 60 ? Math.floor(secondsTotal / 60) : 0;
    const hours = minutesTotal > 60 ? Math.floor(minutesTotal / 60) : 0;
    const minutes = hours > 0 ? minutesTotal % 60 : minutesTotal;

    const minutesString = `${minutes}`.padStart(2, "0");
    const secondsString = `${seconds}`.padStart(2, "0");
    return {hours, minutes: minutesString, seconds: secondsString};
}
