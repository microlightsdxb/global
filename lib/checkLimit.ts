import { NextRequest } from "next/server";
import ratelimit from "./rateLimit";

export const checkLimit = async(request:NextRequest) => {
    try {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
        const result = await ratelimit.limit(ip);
        if(!result.success){
            return {success:false}
        }
        return {success:true}
    } catch (error) {
        console.log("Error in checking limit",error);
        return {success:false}
    }
}