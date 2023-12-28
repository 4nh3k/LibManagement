import moment from 'moment';

export const formatDate = (inputDateString: string): string => {
  const inputDate = moment(inputDateString);

  const formattedDate = inputDate.format('D MMMM [at] HH:mm');

  return formattedDate;
};

export const calculateTimeAgo = (inputDateString: string): string => {
  const inputDate = moment(inputDateString);
  const now = moment();
  const timeAgoInMinutes = now.diff(inputDate, 'minutes');

  if (timeAgoInMinutes < 1) {
    // Less than a minute
    return 'just now';
  } else if (timeAgoInMinutes < 60) {
    // Less than an hour
    return timeAgoInMinutes + 'm';
  } else if (timeAgoInMinutes < 24 * 60) {
    // Less than a day
    const hours = Math.floor(timeAgoInMinutes / 60);
    return hours + 'h';
  } else if (timeAgoInMinutes < 30 * 24 * 60) {
    // Less than a month
    const days = Math.floor(timeAgoInMinutes / (24 * 60));
    return days + 'd';
  } else if (timeAgoInMinutes < 12 * 30 * 24 * 60) {
    // Less than a year
    const months = Math.floor(timeAgoInMinutes / (30 * 24 * 60));
    return months + 'mo';
  } else {
    // More than a year
    const years = Math.floor(timeAgoInMinutes / (12 * 30 * 24 * 60));
    return years + 'y';
  }
};
export const formatSocialNumber = (number: number): string => {
  // Format to number social media
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2
  })
    .format(number)
    .replace('.', ',');
};

const calculateNumLines = (
  textarea: React.RefObject<HTMLTextAreaElement>
): number => {
  const parseValue = (v: string): number =>
    v.endsWith('px') ? parseInt(v.slice(0, -2), 10) : 0;

  if (!textarea.current) {
    // Handle the case where the textarea is not available
    return 0;
  }

  const textareaStyles = window.getComputedStyle(textarea.current);
  const font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`;
  const paddingLeft = parseValue(textareaStyles.paddingLeft);
  const paddingRight = parseValue(textareaStyles.paddingRight);
  const textareaWidth =
    textarea.current.getBoundingClientRect().width - paddingLeft - paddingRight;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    // Context not available, return a default value
    return 0;
  }
  context.font = font;

  const words = textarea.current.value.split(' ');
  let lineCount = 0;
  let currentLine = '';
  for (let i = 0; i < words.length; i++) {
    const wordWidth = context.measureText(words[i] + ' ').width;
    const lineWidth = context.measureText(currentLine).width;

    if (lineWidth + wordWidth > textareaWidth) {
      lineCount++;
      currentLine = words[i] + ' ';
    } else {
      currentLine += words[i] + ' ';
    }
  }

  if (currentLine.trim() !== '') {
    lineCount++;
  }

  return lineCount;
};

export const handleTextAreaChange = ({
  textAreaRef,
  originalHeight = 36
}: {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  originalHeight?: number;
  valueTextArea?: string;
}) => {
  if (textAreaRef.current) {
    // Check if it's only 1 line
    const lineOfText = calculateNumLines(textAreaRef);
    if (lineOfText <= 1) {
      return (textAreaRef.current.style.height = `${originalHeight}px`);
    }

    // const textAreaWidth = textAreaRef.current.clientWidth;
    // const textContentWidth = calculateTextWidth(textAreaRef);

    // if ((textContentWidth || 0) < textAreaWidth) {
    //   return (textAreaRef.current.style.height = `${originalHeight}px`);
    // }

    textAreaRef.current.style.height = 'auto'; // Reset the height to auto to adjust to content
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'; // Set the height to the scrollHeight
  }
};

export const fileNameExtension = (file?: File): string => {
  return file?.name.split('.').pop() || '';
};
