class SettingsController {
    show(request, response) {
        const user = request.user;
        response.status(200).json({user})
    }
}

const Settings = new SettingsController();
module.exports = Settings;