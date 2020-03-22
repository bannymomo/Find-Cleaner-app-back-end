require("dotenv").config();
require("express-async-errors");
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const connectToDB = require("./utils/db");

const app = express();
const PORT = process.env.PORT || 3333;
const morganLog =
    process.env.NODE_ENV === "production" ? morgan("common") : morgan("dev");

app.use(helmet());
app.use(morganLog);
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

connectToDB()
    .then(() => {
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(error => {
        console.log("DB connection failed");
        console.error(error.message);
        process.exit(1);
    });
