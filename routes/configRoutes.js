const indexR = require("./indexs")
const usersR = require("./users")
const productsR = require("./products")
const authR = require("./auth")
const categoryR = require("./categories")
const billsR = require("./bills")
const dashboardR = require("./dashboards")


exports.routesInit = (app) => {
    app.use("/", indexR)
    app.use("/users", usersR)
    app.use("/products", productsR)
    app.use("/auth", authR)
    app.use("/categories", categoryR)
    app.use("/bills", billsR)
    app.use("/dashboards", dashboardR)
}

