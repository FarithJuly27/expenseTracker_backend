const express = require('express');
const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');
const transactionRoutes = require('./transaction.routes');
const budgetRoutes = require('./budget.routes');


//Group Investment 
const groupRoutes = require('../routes/group.routes')
const groupMemberRoutes = require('../routes/groupMember.routes')
const investmentRoutes = require('../routes/investment.routes')

module.exports = (app) => {
    app.use('/userAuth', userRoutes)
    app.use('/category', categoryRoutes)
    app.use('/transaction', transactionRoutes)
    app.use('/budget', budgetRoutes)

    //Group Investment
    app.use('/group', groupRoutes)
    app.use('/groupMember', groupMemberRoutes)
    app.use('/investment', investmentRoutes)

}


