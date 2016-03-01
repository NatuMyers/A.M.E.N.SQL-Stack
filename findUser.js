var User = require('./models/user')

var log = function(inst) {

    console.dir(inst.get())

}

User.findAll({
    attributes: ['UserID'],
    where: { visible: true },
    order: '"createdAt" DESC'
})

    .then(function(users) {
         
        users.forEach(log)
    })
