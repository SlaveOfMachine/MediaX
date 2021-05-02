
class AnalyticsController {
    index(request, response) {
        response.status(200);
    }
}

const Analytics = new AnalyticsController();
module.exports = Analytics;