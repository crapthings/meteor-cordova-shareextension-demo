import fs from 'fs'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'

const server = express()
const router = express.Router()

const UPLOAD_PATH = process.env.UPLOAD_PATH || '/Users/monsterstep/dev/cordova-playground/openwith/.uploads'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, UPLOAD_PATH)
  },
  filename: function (req, file, callback) {
    file._id = Random.id()
    file.createdAt = new Date()
    callback(null, file._id)
  },
})

const uploader = multer({ storage })

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/api', router)
registerUploadRouter({ router })

WebApp.connectHandlers.use(Meteor.bindEnvironment(server))

function registerUploadRouter ({ router }) {
  router.post('/upload', uploader.array('files'), async function (req, res) {
    res.json(req.files)
  })
}
