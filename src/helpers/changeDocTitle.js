import { BASE_DOCTITLE } from "./constants"


function changeDocTitle(value) {

  if (value === '/') {
    document.title = BASE_DOCTITLE
    return
  }

  document.title = `${BASE_DOCTITLE} — ${value}`
}


export default changeDocTitle