module.exports = (name) => {
  return /[\w-]+( \w)?/i.exec(name)[0] + '.';
}