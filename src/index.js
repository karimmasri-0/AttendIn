const app = require('./server');
var port = process.env.PORT || 8080;
const userRoutes = require('./Routes/user');
app.use('/users',userRoutes);
app.listen(port, () => console.log('server listening on port 8080'));
