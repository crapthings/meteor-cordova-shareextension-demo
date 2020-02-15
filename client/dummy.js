// import axios from 'axios'
//
// const fileReaderSync = file => new Promise(resolve => {
//   const reader = new FileReader()
//   reader.onloadend = function () {
//     var blob = new Blob([new Uint8Array(this.result)], { type: file.type })
//     resolve(blob)
//   }
//   reader.readAsArrayBuffer(file)
// })
//
// const resolveLocalFileSystemURLSync = uri => new Promise(resolve => {
//   window.resolveLocalFileSystemURL(uri, function (fileEntry) {
//     fileEntry.file(resolve)
//   })
// })
//
//
// Meteor.startup(function () {
//   cordova.openwith.init(function () {
//     cordova.openwith.addHandler(async function (intent) {
//       const data = new FormData()
//
//       if (intent.items.length > 0) {
//         for (const item of intent.items) {
//           const file = await resolveLocalFileSystemURLSync(item.uri)
//           const blob = await fileReaderSync(file)
//           data.append('files', blob)
//         }
//
//         axios({
//           method: 'post',
//           url: 'http://192.168.50.76:3000/api/upload',
//           data,
//           headers: {'Content-Type': 'multipart/form-data' }
//         })
//         .then(function (response) {
//           alert(JSON.stringify(response, null, 2));
//         })
//         .catch(function (response) {
//           alert(response);
//         })
//       }
//     })
//   }, function () {
//     alert('failed')
//   })
// })
