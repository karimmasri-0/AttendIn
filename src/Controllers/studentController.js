const RoomReservation = require('../Models/roomReservation');
exports.studentSchedule = (req, res) => {
    const id = req.params.id
    RoomReservation.studentSchedulebyday(id, (err, data) => {
        console.log(err);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Schedule."
            });
        }
        else res.send(data);
    })
}