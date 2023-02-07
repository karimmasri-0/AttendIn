const app = require('./server');
const server = require('./Controllers/monitoringController');
var port = process.env.PORT || 8000;
const userRoutes = require('./Routes/user');
const roomRoutes = require('./Routes/room');
const roomReservRoutes = require('./Routes/roomReserv')
const student = require('./Routes/student')
const monitoring = require('./Routes/monitoring')
const teacher = require('./Routes/teacher')
const auth = require("./Routes/auth");
app.use('/login', auth);
app.use('/users', userRoutes);
app.use('/rooms', roomRoutes)
app.use('/roomReservations', roomReservRoutes)
app.use('/student', student)
app.use('/monitoring',monitoring)
app.use('/teacher',teacher)
app.listen(port, () => console.log('server listening on port 8080'));
