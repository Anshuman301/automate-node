const rough = require('./rough.json')

const main = require('./main.json')

const {writeFileSync} = require('fs')

const keysToMaintain = [
    "Month 2 [2nd April to ]", 
    "FIELD18",
    "FIELD19",
    "FIELD20",
    "FIELD21"
]

const mapkeysToMain = {
    "Month 2 [2nd April to ]": "Poster Drive",
    "FIELD18": " Reels",
    "FIELD19": " Comments on Insta Post",
    "FIELD20": " Recruit Scouts",
    "FIELD21": " Insta Story"
}

const aboveKeys = Object.keys(mapkeysToMain)

const [, ...rest] = rough

const emailRoughMapData = {}

for(const item of rest) {
    emailRoughMapData[item.FIELD6] = {}
    for(const key of aboveKeys) {
        emailRoughMapData[item.FIELD6][key] = item[key]
    }
}

for(const item of main) {
    if(item['Scout Email'] in emailRoughMapData) {
        for(const key in item['Performance ']) {
            if(key in emailRoughMapData[item['Scout Email']]) {
                const value = emailRoughMapData[item['Scout Email']][key]
                if(value) {
                    const isNaN = parseInt(item['Performance '][key])
                    if(isNaN) {
                        item['Performance '][key] = value
                    }else {
                        const [left, right] = item['Performance '][key].split('/')
                        item['Performance '][key] = `${value}/${right}`
                    }
                }
            }
        }
    }
}

try {
    writeFileSync('./output.json', JSON.stringify(main, null, 2), 'utf8');
    console.log('Data successfully saved to disk');
  } catch (error) {
    console.log('An error has occurred ', error);
  }