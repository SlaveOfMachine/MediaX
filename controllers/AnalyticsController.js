const Sequelize = require('sequelize');
const User = require('../models').User;
class AnalyticsController {

    async index(request, response) {
        const query = request.query;
        const user = request.user;
        let collectionData = await User.findOne({
            where: { id: user.id },
            include: [{ all: true, nested: true }]
        });
        
        if (query.count_only) {
            collectionData = this.getCount(collectionData);
        }

        return response.status(200).json({ collectionData });
    }

    getCount(data) {
        const collections = data.collections;
        let videos = collections.map(c => c.videos.length);
        videos = videos.length ? videos.reduce((a, b) => a + b) : 0;
        const audios = 0;
        const slides = 0;
        return {
            collections: collections.length,
            videos,
            audios,
            slides,
        }
    }
}

const Analytics = new AnalyticsController();
module.exports = Analytics;