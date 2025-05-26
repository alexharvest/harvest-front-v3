const fs = require('fs')
const path = require('path')
const { omit, isArray } = require('lodash')

const formatItems = (items, fieldToExclude) => {
  const formattedItems = {
    version: process.env.REACT_APP_DATA_VERSION || '1.0.0',
    updatedAt: new Date(),
    data: isArray(items) ? [] : {},
  }

  Object.keys(items).forEach(item => {
    const selectedItem = items[item]

    if (isArray(items)) {
      formattedItems.data.push(omit(selectedItem, fieldToExclude))
    }

    formattedItems.data[item] = omit(selectedItem, fieldToExclude)
  })

  return formattedItems
}

const saveFormattedData = (data, filePath) => {
  const dir = path.dirname(filePath)

  // Make sure the directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFile(filePath, JSON.stringify(data), 'utf8', err => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Generated list saved into ${filePath}!`)
    }
  })
}

module.exports = {
  formatItems,
  saveFormattedData,
}
