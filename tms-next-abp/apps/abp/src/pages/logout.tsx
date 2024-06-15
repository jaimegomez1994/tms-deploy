import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LogoutPage() {
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        signOut({ redirect: false }).then(() => {
            router.push(
                '/api/auth/logout?id_token_hint=' + session.data?.idToken
            );
        });
    }, []);
    return false;
}
