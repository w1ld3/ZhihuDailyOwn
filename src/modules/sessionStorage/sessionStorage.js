export {setSessionStorage, getSessionStorage, removeSessionStorage}

function setSessionStorage (key, value = {}) {
  if (!window.sessionStorage) {
    console.log('Doesn\'t support SessionStorage.')
  }
  let storage = window.sessionStorage
  storage.setItem(key, JSON.stringify(value))
}

function getSessionStorage (key) {
  if (!window.sessionStorage) {
    console.log('Doesn\'t support SessionStorage.')
  }
  let storage = window.sessionStorage
  console.log(storage.getItem(key))
  return JSON.parse(storage.getItem(key) || {})
}

function removeSessionStorage (key) {
  if (!window.sessionStorage) {
    console.log('Doesn\'t support SessionStorage.')
  }
  let storage = window.sessionStorage
  if (storage[key]) {
    storage.removeItem(key)
  }
}
