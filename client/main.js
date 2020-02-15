import axios from 'axios'

const fileReaderSync = file => new Promise(resolve => {
  const reader = new FileReader()
  reader.onloadend = function () {
    var blob = new Blob([new Uint8Array(this.result)], { type: file.type })
    resolve(blob)
  }
  reader.readAsArrayBuffer(file)
})

const resolveLocalFileSystemURLSync = uri => new Promise(resolve => {
  window.resolveLocalFileSystemURL(uri, function (fileEntry) {
    fileEntry.file(resolve)
  })
})

const uploadFiles = async function (urls) {
  const data = new FormData()

  if (urls.length > 0) {
    for (const item of urls) {
      const file = await resolveLocalFileSystemURLSync(item)
      const blob = await fileReaderSync(file)
      data.append('files', blob)
    }

    axios({
      method: 'post',
      url: 'http://192.168.50.76:3000/api/upload',
      data,
      headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(function (response) {
      alert(JSON.stringify(response, null, 2));
    })
    .catch(function (response) {
      alert(response);
    })
  }
}


Meteor.isCordova && Meteor.startup(function () {
  cordova.shareextension && cordova.shareextension.onFiles(async function (urls) {
    uploadFiles(urls)
  }, console.log)

  cordova.openwith && cordova.openwith.init && cordova.openwith.init(function () {
    cordova.openwith.addHandler(async function (intent) {
      const urls = _.map(intent.items, 'uri')
      uploadFiles(urls)
    })
  }, console.log)
})
