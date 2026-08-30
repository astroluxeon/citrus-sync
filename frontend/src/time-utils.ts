export const TIME_INTERVAL = 30 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export function parseTime(time: string) {
  const [hours, minutes] = time.split(':');
  return (parseInt(hours) * 60 * 60 * 1000) + (parseInt(minutes) * 60 * 1000);
}

export function generateTimeSlots(startDate: string, endDate: string, startTime: string, endTime: string) {
  let timeSlots = [];
  const start1 = new Date(startDate + "T00:00:00").getTime();
  const end1 = new Date(endDate + "T00:00:00").getTime();

  for (let i = start1; i <= end1; i += ONE_DAY) {
    const start2 = i + parseTime(startTime);
    const end2 = i + parseTime(endTime);

    for (let j = start2; j < end2; j += TIME_INTERVAL) {
      timeSlots.push({
        startTime: j,
        endTime: j + TIME_INTERVAL
      });
    }
  }

  return timeSlots;
}