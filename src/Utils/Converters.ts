
const NumberToMonthName = (month:Number) => {
    return Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(month.toString()));
}

const textToNumberParser = (text: string) => {
    return text.replaceAll(/[^0-9]+/g, "");
  };

export default {NumberToMonthName, textToNumberParser};