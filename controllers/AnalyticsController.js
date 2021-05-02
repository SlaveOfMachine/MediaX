
class AnalyticsController {

    index(request, response) {
        return response.status(200).json({message: 'as'});
    }
}

const Analytics = new AnalyticsController();
module.exports = Analytics;