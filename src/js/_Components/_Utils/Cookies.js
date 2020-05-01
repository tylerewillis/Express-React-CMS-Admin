//============================================
//= Managing cookies
//============================================

export const setCookie = (name, value = true, days = 180) => {
  var expires
  var date = new Date()
  date.setTime(date.getTime() + (days*24*60*60*1000))
  expires = "; expires=" + date.toUTCString()
  document.cookie = name + "=" + (value || "")  + expires + "; path=/"
}

export const getCookie = (name) => {
  var nameEQ = name + "="
  var ca = document.cookie.split(';')
  for (var i=0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0)===' ') c = c.substring(1,c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length)
  }
  return null
}

export const eraseCookie = (name) => {   
  document.cookie = name+'=; Max-Age=-99999999;'
}

export const toggleCookie = (name, value, days = 180) => {
  if (getCookie(name)) eraseCookie(name)
  else setCookie(name, value, days)
}