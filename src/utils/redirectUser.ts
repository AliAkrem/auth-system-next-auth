import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const redirectUser = (router: AppRouterInstance, destination: string) => {
    if (typeof window !== 'undefined') {
        router.push(destination);
    }
};