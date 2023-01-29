const Room = require('../Models/room');

exports.getAllRooms = (req, res) => {
    Room.allRooms((err, data) => {
        console.log(err);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Rooms."
            });
        }
        else res.send(data);
    })
}
exports.getSingleRoom = (req, res) => {
    const id = req.params.id
    Room.findRoomById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found Room with id ${req.params.id}.` })
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Room with id ${req.params.id}`
                })
            }
        } else res.send(data);
    })
}
exports.createRoom = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const room = await new Room(
        null,
        req.body.Name,
        req.body.Description,
        req.body.Capacity,
    )
    Room.create(room, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating Room."
            });
        }
        else res.send({ message: "Room Created Successfully" });
    });
};
exports.updateRoom = async (req, res) => {
    if (!req.body.Name || !req.body.Description || !req.body.Capacity) {
        res.status(400).send({
            message: "All Field Required!"
        });
    } else {
        const room = await new Room(
            req.params.id,
            req.body.Name,
            req.body.Description,
            req.body.Capacity
        )
        Room.updateRoomById(room, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found romm with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating room with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
        );
    }
};
exports.deleteRoom = (req, res) => {
    Room.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Room with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Room with id " + req.params.id
                });
            }
        } else res.send({ message: `Room was deleted successfully!` });
    });
};