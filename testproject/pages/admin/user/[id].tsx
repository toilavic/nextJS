import { useRouter } from 'next/router'
import Link from 'next/link'
export default function AdminUser() {
    const router = useRouter();

    console.log(router)
    
    function onBackHome() {
        router.push('/');
    }
    
    
    return(
        <>
            <h1>Admin => User page</h1>
            <Link href="/">
                <button>Go to homepage</button>
            </Link>
        </> 
    )
}