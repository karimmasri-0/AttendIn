const RoomReservation = require('../Models/roomReservation');

exports.getAllRoomReservations = (req, res) => {
    RoomReservation.allRoomReservations((err, data) => {
        console.log(err);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving RoomReservations."
            });
        }
        else res.send(data);
    })
}
exports.getSingleRoomReservation = (req, res) => {
    const id = req.params.id
    RoomReservation.findRoomReservationById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found RoomReservation with id ${req.params.id}.` })
            }
            else {
                res.status(500).send({
                    message: `Error retrieving RoomReservation with id ${req.params.id}`
                })
            }
        } else res.send(data);
    })
}

exports.deleteRoomReservation = (req, res) => {
    RoomReservation.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found RoomReservation with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete RoomReservation with id " + req.params.id
                });
            }
        } else res.send({ message: `RoomReservation was deleted successfully!` });
    });
};