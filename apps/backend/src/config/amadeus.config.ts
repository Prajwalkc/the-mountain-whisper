import { registerAs } from "@nestjs/config";

export default registerAs("amadeus", () => ({
  clientId: process.env.AMADEUS_API_KEY || "gMgRz7ARjamVWs1mDzbg5U3rRKEwwsGm",
  clientSecret: process.env.AMADEUS_API_SECRET || "pzfhgE9FsNVoADmf",
  hostname: process.env.AMADEUS_HOSTNAME || "test", // 'test' for sandbox, 'production' for live
}));
