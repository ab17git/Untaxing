module.exports.getHomePageData = async (req, res) => {
    try {
        // var startDate = commonDate.getCurrentDateTime();
        console.log(req.body)
        res.send({'msg': 'In home controller'})

    } catch (e) {
        console.log(e);
        res.status(500).send(false);
    }
}

module.exports.test = async (req, res) => {
    try {
        // var startDate = commonDate.getCurrentDateTime();
        console.log(req.body)
        res.send({'msg': 'api is working'})

    } catch (e) {
        console.log(e);
        res.status(500).send(false);
    }
}