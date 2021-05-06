require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const hasMutation = require("./hasMutation");
const MutationModel = require("./models/Mutation");

const PORT = process.env.PORT || 3000;
const MONGO_DB = process.env.MONGO_DB;

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Database On 🔋: ${MONGO_DB}`);
});

app.post("/mutation", (req, res) => {
  let isMutated = hasMutation(req.body.dna);
  MutationModel.create({
    result: isMutated,
  })
    .then(() => {
      if (isMutated) {
        res.status(200).send("Dna is mutated.");
      } else {
        res.status(403).send("Dna is not mutated.");
      }
    })
    .catch((err) => console.log(err));
});

app.get("/stats", (req, response) => {
  MutationModel.find()
    .countDocuments()
    .then((res) => {
      let totalStats = res;
      MutationModel.find({
        result: true,
      })
        .countDocuments()
        .then((res) => {
          let count_mutations = res;
          return response.status(200).send({
            count_mutations: count_mutations,
            count_no_mutation: totalStats - count_mutations,
            ratio: count_mutations / totalStats,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`App listening on port:${PORT}`);
});
