//constanta initHttp untuk meng inisialkan http api dari masing2 file config
const initHttp = () => {
  require('./home')()
  require('./auth')()

  require('./admin/menu')()
}

module.exports = () => initHttp()
