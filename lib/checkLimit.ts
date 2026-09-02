import { NextRequest } from "next/server";
import ratelimit from "./rateLimit";

export const checkLimit = async(request:NextRequest) => {
    try {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
        const result = await ratelimit.limit(ip);
        console.log("RATE LIMIT DEBUG:", {
            ip,
            success: result.success,
            limit: result.limit,
            remaining: result.remaining,
            reset: new Date(result.reset).toISOString(),
            now: new Date().toISOString(),
        });
        if(!result.success){
            return {success:false}
        }
        return {success:true}
    } catch (error) {
        console.log("Error in checking limit",error);
        return {success:false}
    }
}