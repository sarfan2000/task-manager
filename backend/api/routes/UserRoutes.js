module.exports = function(app) {
    const { Auth } = require("../middleware/auth");

    const UserController = require("../controllers/UserController");

    app.get('/test',UserController.test);
    app.get('/getTask',UserController.getTask);
    app.post('/createTask',UserController.createTask);
    app.delete('/deleteTask/:taskId',UserController.deleteTask);
    app.get('/getOneTask/:taskId',UserController.getOneTask);
    app.put('/updateTask/:taskId',UserController.updateTask);
    
    
};