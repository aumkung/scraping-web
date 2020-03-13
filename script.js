const request = require('request-promise')
const cheerio = require('cheerio')
const movieUrl = 'https://seeme.me/ch/khatha/MgL3Y4?pl=DNq1XE'

const loadMoreContent = async () => {
    const response = await request({
        uri: movieUrl,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'seeme.me',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
        },
        gzip: true
    })

    let $ = cheerio.load(response);
    let recommend_title = $('div[id=clipview-recommend] > section > header > div > h2').text().trim(0)
    let data = $('div[id=clipview-recommend] > section').find($('.clip')).map(function(i, el) {
        // this === el
        return {
            clip_title: $(this).find($('a[class=link]')).attr('title'),
            img_src: $(this).find($('img[class=clip-thumbnail]')).attr('src'),
            duration: $(this).find($('span[class=duration]')).text()
        };
    }).get()

    return {
        title: recommend_title,
        data: data
    }
}

loadMoreContent().then(data => {
    console.log(data)
})
