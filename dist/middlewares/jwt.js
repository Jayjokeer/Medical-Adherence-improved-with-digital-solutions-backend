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
exports.isUser = exports.signedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Jwt_secret = process.env.JWT_SECRET;
const signedUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jsonwebtoken_1.default.sign(user, Jwt_secret);
});
exports.signedUser = signedUser;
const verifyJwt = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(token, Jwt_secret);
});
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = req.headers.authorization;
        if (!headers) {
            return "No token please login";
        }
        ;
        const headerToken = headers.split(" ")[1];
        const token = yield verifyJwt(headerToken);
        if (!token) {
            return "Token expired";
        }
        ;
        req.user = token;
        next();
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
    ;
});
exports.isUser = isUser;
