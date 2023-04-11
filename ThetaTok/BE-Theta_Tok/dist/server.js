"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
const i = "Ben";
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src/index.html'));
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.post('/hi', (req, res) => {
    console.log(req.body.email);
    res.send(req.body.email);
});
