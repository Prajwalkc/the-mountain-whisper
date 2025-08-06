"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("amadeus", () => ({
    clientId: process.env.AMADEUS_API_KEY || "gMgRz7ARjamVWs1mDzbg5U3rRKEwwsGm",
    clientSecret: process.env.AMADEUS_API_SECRET || "pzfhgE9FsNVoADmf",
    hostname: process.env.AMADEUS_HOSTNAME || "test",
}));
//# sourceMappingURL=amadeus.config.js.map