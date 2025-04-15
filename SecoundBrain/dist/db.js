"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.LinkModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 10,
        trim: true
    }
});
const content = new mongoose_1.default.Schema({
    type: String,
    title: String,
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userID: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true },
    date: String
});
const LinkSchema = new mongoose_1.default.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true, unique: true }
});
const UserModel = mongoose_1.default.model('user', userSchema);
exports.UserModel = UserModel;
const LinkModel = mongoose_1.default.model('Link', LinkSchema);
exports.LinkModel = LinkModel;
const ContentModel = mongoose_1.default.model('content', content);
exports.ContentModel = ContentModel;
