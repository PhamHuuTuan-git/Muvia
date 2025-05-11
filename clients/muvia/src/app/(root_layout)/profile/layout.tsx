"use client"
import "./style.scss";
import Link from "next/link";
import routing from "@/utils/routing";
import { notFound, usePathname } from 'next/navigation';
function ProfileLayput({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const realSlug = usePathname()?.split("/")[2];
    // if(!userAuthen) {
    //     notFound();
    // }
    return (
        <div style={{ marginTop: "80px", padding: "40px" }}>
            <div className="tab-profile--container">
                {/* <div className="link-profile--container">
                    <Link className={`link-profile ${realSlug === "me" ? "active": null}`} href={`${routing.profile}/me`}>My self</Link>
                </div> */}
                <div className="link-profile--container">
                    <Link className={`link-profile ${realSlug === "liked" ? "active": null}`}  href={`${routing.profile}/liked`}>Liked</Link>
                </div>
                <div className="link-profile--container">
                    <Link className={`link-profile ${realSlug === "recent-watching" ? "active": null}`} href={`${routing.profile}/recent-watching`}>Recent watching</Link>
                </div>
            </div>
            <div style={{marginTop:"40px"}}>
                {children}
            </div>
        </div>
    );
}

export default ProfileLayput