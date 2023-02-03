const app = require('./server');
var port = process.env.PORT || 8080;
const userRoutes = require('./Routes/user');
const roomRoutes = require('./Routes/room');
const roomReservRoutes = require('./Routes/roomReserv')
const student = require('./Routes/student')
const auth = require("./Routes/auth");
app.use('/login',auth);
app.use('/users',userRoutes);
app.use('/rooms',roomRoutes)
app.use('/roomReservations',roomReservRoutes)
app.use('/student',student)

app.listen(port, () => console.log('server listening on port 8080'));
