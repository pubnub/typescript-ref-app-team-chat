export default (ts: string) => {
  const date = new Date(parseInt(ts) / 10000);
  const minutes = date.getMinutes();
  return `${date.getHours()}:${minutes > 9 ? minutes : "0" + minutes}`;
};
