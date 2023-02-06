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
exports.createRoomReservation = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const roomres = await new RoomReservation(
        null,
        req.body.RoomId,
        req.body.CourseId,
        req.body.Date,
        req.body.STime,
        req.body.ETime
    )
    if (roomres.STime === roomres.ETime) {
        res.json("Start Time and End Time Cannot be equal");
    }
    else {
        RoomReservation.create(roomres, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating Roome Reservation."
                });
            }
            else res.send({ message: "Roome Reservation Created Successfully" });
        });
    }
};
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
