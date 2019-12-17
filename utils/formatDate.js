function formatDate(date) {
  return new Date(date).toLocaleDateString('en-AU')
}

export default formatDate;