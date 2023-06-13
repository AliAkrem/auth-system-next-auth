import { useRouter } from 'next/navigation';


export const useRedirect = (destination: string) => {
    
    const router = useRouter();

    router.push(destination)

};