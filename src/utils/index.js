export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem('hkzf_city'))

  console.log(localCity)
  const curCity = {
    "label": "北京",
    "value": "AREA|88cff55c-aaa4-e2e0",
    "pinyin": "beijing",
    "short": "bj"
  }
  if (!localCity) {
    localStorage.setItem('hkzf_city', JSON.stringify(curCity))
    return Promise.resolve(curCity)
  }
  // for demo, return a successful promise
  return Promise.resolve(localCity)
}