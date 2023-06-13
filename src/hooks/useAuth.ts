import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { redirectUser } from '@/utils/redirectUser';

type Props  = {
    isAuthenticated : "loading" | "authenticated" | "unauthenticated"
}


export const useAuth = ({isAuthenticated} : Props) => {
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated === 'unauthenticated') {
      redirectUser(router, '/login');
    }
  }, [isAuthenticated, router]);
};