"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const db_1 = require("./db");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_secret = "suraj-private";
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utlis_1 = __importDefault(require("./utlis"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(express_1.default.json());
function Connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.CONNECTION_URL) {
                yield mongoose_1.default.connect(process.env.CONNECTION_URL);
                console.log("database connected");
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
Connect();
const corsOptions = {
    origin: process.env.REQURL,
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
const Validation = zod_1.default.object({
    firstname: zod_1.default.string(),
    lastname: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
const Authenticate = zod_1.default.object({
    // firstname : z.string(),
    // lastname : z.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    const { success, data, error } = Validation.safeParse(body);
    // console.log(data)
    if (success) {
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        try {
            const user = yield db_1.UserModel.create({
                firstname: data.firstname,
                lastname: data.lastname,
                email: req.body.email,
                password: hashedPassword
            });
            // console.log("User found!!",user)
            const id = user._id;
            let token = jsonwebtoken_1.default.sign({ id }, jwt_secret);
            console.log(token);
            res.json({ tokenReceived: token });
            // console.log(data)
        }
        catch (e) {
            console.log("error ", e);
        }
    }
}));
app.get('/demo', (req, res) => {
    res.json({ mssg: "demo working" });
});
app.post('/api/v1/signIn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let user = yield db_1.UserModel.findOne({ email });
    console.log(user);
    if (!user) {
        res.json({ mssg: "Invalid Credentials" });
    }
    else {
        // const hashedPassword = await bcrypt.hash(password,10)
        let success = yield bcrypt_1.default.compare(password, user.password);
        //  const hashedPassword = await bcrypt.hash(password, 10);
        //  console.log(hashedPassword)
        if (!success) {
            console.log("Not matched ", success);
        }
        else {
            console.log(success);
            let id = user._id;
            let token = jsonwebtoken_1.default.sign({ id }, jwt_secret);
            res.json({ token });
        }
    }
}));
app.post('/api/v1/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let link = req.body.link;
        let type = req.body.type;
        const token = req.header('Authorization');
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
            let UID = decoded.id.toString();
            console.log(UID);
            if (link != '' && type != '') {
                yield db_1.ContentModel.create({
                    link,
                    type,
                    title: req.body.title,
                    userID: new mongoose_1.default.Types.ObjectId(UID),
                    tags: []
                });
                res.json({ mssg: "content added" });
            }
            else {
                res.json({ mssg: "Fields are empty !!" });
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}));
app.get('/api/v1/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    console.log(req.header);
    try {
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
            let UID = decoded.id.toString();
            let nid = new mongoose_1.default.Types.ObjectId(UID);
            let content = yield db_1.ContentModel.find({ userID: nid }).populate("userID", "email");
            if (content) {
                res.json({ content });
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}));
app.post('/api/v1/share', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const share = req.body.share;
        const token = req.header('Authorization');
        let nid;
        if (token) {
            let decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
            let UserId = decoded === null || decoded === void 0 ? void 0 : decoded.id.toString();
            nid = new mongoose_1.default.Types.ObjectId(UserId);
            let user = yield db_1.LinkModel.findOne({ userId: nid });
            console.log("post link", user);
            let link;
            if (!user) {
                console.log("user created");
                link = yield db_1.LinkModel.create({
                    userId: nid,
                    hash: (0, utlis_1.default)(10)
                });
            }
            else {
                link = user;
            }
            res.json({ link: `http://localhost:5173/SocialShare/${link.hash}` });
        }
    }
    catch (e) {
        res.json({ e });
    }
}));
app.get('/api/v1/:sharelink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hash = req.params.sharelink;
    console.log(hash);
    let user = yield db_1.LinkModel.findOne({ hash });
    console.log(user);
    if (!user) {
        res.status(404).json({ message: "Link not found" });
    }
    else {
        try {
            let content = yield db_1.ContentModel.find({
                userID: user.userId
            });
            if (!content) {
            }
            else {
                res.json({ content });
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}));
app.listen(3000, () => {
    console.log("server started!!", 3000);
});
