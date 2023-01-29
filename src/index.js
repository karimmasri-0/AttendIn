const app = require('./server');
var port = process.env.PORT || 8080;
const userRoutes = require('./Routes/user');
const roomRoutes = require('./Routes/room');
const auth = require("./Routes/auth");
app.use('/login',auth);
app.use('/users',userRoutes);
app.use('/rooms',roomRoutes)
app.listen(port, () => console.log('server listening on port 8080'));
