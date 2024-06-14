import express from "express";

export const app = express()

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "24kb"}));
app.use(express.static("public"));