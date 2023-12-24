export const calculateMinMaxDates = () => {
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(maxDate.getFullYear() - 17); // min 17 years old
  const minDate = new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear() - 60); // max 60 years old

  return {
    min: minDate.toISOString().split('T')[0],
    max: maxDate.toISOString().split('T')[0]
  };
};
