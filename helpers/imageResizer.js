const Jimp = require('jimp')

const imgResizer = async (avatarUrl) => {
  try {
    if (avatarUrl) {
      const image = await Jimp.read(avatarUrl)
      return image
        .resize(250, 250)
        .quality(80)
        .writeAsync(avatarUrl)
    }
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = {
  imgResizer
}
