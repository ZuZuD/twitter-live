/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

(function () {
  document.getElementById('submit').addEventListener('click', function () {
    submit_stg()
  })
  document.getElementById('reset').addEventListener('click', function () {
    reset_stg()
  })
  settings_page()
})()

function settings_page () {
  // header button content
  var btn_settings = document.getElementById('settings')
  var url_settings = document.getElementById('settings_form')
  if (btn_settings.value === 'Settings') {
    btn_settings.value = 'Live'
    url_settings.action = 'settings.html'
  } else {
    btn_settings.value = 'Settings'
    url_settings.action = '/'
  }
  var xhr = new XMLHttpRequest()
  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200)) {
      tick_opts = JSON.parse(xhr.responseText)
      check_box(tick_opts)
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) { console.log('Error happens !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText) }
  })
  xhr.open('GET', '/tick_opts', true)
  xhr.send(null)

//    document.getElementById("checkbox").checked = true;
//    document.getElementById("checkbox").checked = false;
}

function submit_stg () {
  // fetch ticked values on submit
  var form = new FormData()
  var xhr = new XMLHttpRequest()
  var tick_opts = { 'show_author': document.getElementById('show_author').checked,
    'show_date': document.getElementById('show_date').checked,
    'boldify_keyword': document.getElementById('boldify_keyword').checked }

  // save a cookie with params
  if (window.c_enable) {
    setCookie('tick_opts', JSON.stringify(tick_opts), 180)
    console.log(JSON.stringify(tick_opts))
  }
  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200)) {
      window.location.href = '/'
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 199) {
      console.log('Error happens !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText)
    }
  })
  form.append('tick_opts', JSON.stringify(tick_opts))
  xhr.open('POST', '/settings.html', true)
  xhr.send(form)
}

function reset_stg () {
  check_box(tick_opts)
}

function check_box (tick_opts) {
  for (var i in tick_opts) {
    console.log(i, tick_opts[i])
    try {
      if (tick_opts[i] === true) {
        document.getElementById(i).checked = true
      } else {
        document.getElementById(i).checked = false
      }
    } catch (e) {
      console.log(e.message, e.name)
    }
  }
}
