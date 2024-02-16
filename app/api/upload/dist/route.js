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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.POST = void 0;
var server_1 = require("next/server");
var buffer_1 = require("buffer");
var prisma_1 = require("@/lib/prisma");
var AWS = require("aws-sdk");
var crypto_1 = require("crypto");
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
var bucket = process.env.S3_BUCKET_NAME;
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var MAX_FILE_SIZE_MB, MAX_FILE_SIZE_BYTES, MAX_FILES_COUNT, data, file, s3, uploadedFiles, _i, file_1, f, bytes, buffer, fileExtension, key, params, uploadResponse, conversion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    MAX_FILE_SIZE_MB = 5;
                    MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
                    MAX_FILES_COUNT = 3;
                    return [4 /*yield*/, req.formData()];
                case 1:
                    data = _a.sent();
                    file = data.getAll('file');
                    if (!file || file.length === 0) {
                        return [2 /*return*/, new server_1.NextResponse(JSON.stringify({ error: "no files found here" }), {
                                status: 400
                            })];
                    }
                    if (file.some(function (f) { return f.size > MAX_FILE_SIZE_BYTES; })) {
                        return [2 /*return*/, new server_1.NextResponse(JSON.stringify({ error: "File size should be under " + MAX_FILE_SIZE_MB + "MB" }), {
                                status: 400
                            })];
                    }
                    if (file.length > MAX_FILES_COUNT) {
                        return [2 /*return*/, new server_1.NextResponse(JSON.stringify({ error: "You can upload a maximum of " + MAX_FILES_COUNT + " files at a time." }), {
                                status: 400
                            })];
                    }
                    s3 = new AWS.S3();
                    uploadedFiles = [];
                    _i = 0, file_1 = file;
                    _a.label = 2;
                case 2:
                    if (!(_i < file_1.length)) return [3 /*break*/, 7];
                    f = file_1[_i];
                    return [4 /*yield*/, f.arrayBuffer()];
                case 3:
                    bytes = _a.sent();
                    buffer = buffer_1.Buffer.from(bytes);
                    fileExtension = f.name.split('.').pop();
                    key = "" + crypto_1.randomUUID() + crypto_1.randomUUID() + "." + fileExtension;
                    params = {
                        Bucket: bucket,
                        Key: key,
                        Body: buffer
                    };
                    return [4 /*yield*/, s3.upload(params).promise()];
                case 4:
                    uploadResponse = _a.sent();
                    console.log("File uploaded successfully. " + uploadResponse.Location);
                    return [4 /*yield*/, prisma_1.prisma.conversion.create({
                            data: {
                                s3Key: key,
                                status: 'DONE'
                            }
                        })];
                case 5:
                    conversion = _a.sent();
                    uploadedFiles.push(conversion.id);
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/, server_1.NextResponse.json({ id: uploadedFiles })];
            }
        });
    });
}
exports.POST = POST;
