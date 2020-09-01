export const truncateStr = (text, maxLength, separator = ' ') => {
  if (text.length <= maxLength) return text;
  return text.substr(0, text.lastIndexOf(separator, maxLength));
};
