var fetcher = require('../api/novel')

fetcher.get(472061).then(fetcher.save)