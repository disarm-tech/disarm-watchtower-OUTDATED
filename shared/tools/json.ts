export function isJson(text: string) {
  try {
    JSON.parse(text);
  } catch (e) {
    return false;
  }
  return true;
}

export function catchJson(text: string) {
  const regex = /.*({.*}).*/gs;
  if (regex.test(text)) {
    return text.replace(regex, '$1');
  } else {
    return text;
  }
}
