module.exports = (message) => {
  return /\((.*?)\)/.exec(message)[1];
}