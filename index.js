import express from "express";
import axios from "axios";
import querystring from "node:querystring";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    try {
        const formData = req.body.name;
        let queryString = querystring.stringify(req.body);
        console.log(queryString);
        const response = await axios.get(
            `https://api.agify.io?${queryString}`
        );
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {data: result});
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("solution.ejs", {
          error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });