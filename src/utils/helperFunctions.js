export const nanosecondsToTime = (nanoseconds, seconds) => {
  // Convert nanoseconds to milliseconds and add it to the seconds
  const totalMilliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6);

  // Create a new Date object using the total milliseconds
  const resultDate = new Date(totalMilliseconds);

  // Get the time portion (hours, minutes)
  const hours = resultDate.getHours();
  const minutes = resultDate.getMinutes();

  // Format the AM/PM part
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Get the date portion (e.g., "5/31/2023")
  const formattedDate = `${
    resultDate.getMonth() + 1
  }/${resultDate.getDate()}/${resultDate.getFullYear()}`;

  // Combine the date and time
  const formattedDateTime = `${formattedDate}, ${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;

  return formattedDateTime;
};

export const convertDateToFirestoreTimestamp = (date) => {
  if (!(date instanceof Date)) {
    throw new Error("Invalid input. Please provide a valid Date object.");
  }

  // Convert the date to seconds and nanoseconds
  var seconds = Math.floor(date.getTime() / 1000); // Convert milliseconds to seconds
  var nanoseconds = (date.getTime() % 1000) * 1e6; // Convert remaining milliseconds to nanoseconds

  return {
    seconds: seconds,
    nanoseconds: nanoseconds,
  };
};
