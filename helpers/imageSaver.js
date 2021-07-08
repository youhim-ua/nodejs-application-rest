const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const IMAGE_STORAGE_DIR = path.resolve('./public/avatars')
const { UPLOAD_DIR } = require('../services/downloadService')

const imgSaver = async (imageName) => {
  const imageExt = imageName.split('.')[1]
  const newName = [uuidv4(), imageExt].join('.')
  const oldPath = path.join(UPLOAD_DIR, imageName)
  const avatarSaveFolder = path.join(IMAGE_STORAGE_DIR, newName)
  await fs.rename(oldPath, avatarSaveFolder)
  return avatarSaveFolder
}

module.exports = {
  imgSaver,
  IMAGE_STORAGE_DIR
}
