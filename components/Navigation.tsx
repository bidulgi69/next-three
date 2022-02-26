import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

function Navigation() {
    const router: NextRouter = useRouter()

    const isInactive = (zone: string): string => {
        return router.pathname === zone ? "active" : "inactive"
    }

    return (
        <div className={"container"}>
            <div className={"inner-container"}>
                <Link href={"/"}>
                    <a className={isInactive("/")}>Home</a>
                </Link>
                <Link href={"/about"}>
                    <a className={isInactive("/about")}>About</a>
                </Link>
                <Link href={"/theater"}>
                    <a className={isInactive("/theater")}>Theater</a>
                </Link>
                <Link href={"/turntable"}>
                    <a className={isInactive("turntable")}>Turntable</a>
                </Link>
                <Link href={"/horror"}>
                    <a className={isInactive("/horror")}>Horror House</a>
                </Link>
            </div>
            <style jsx>{`
                .container {
                    width: 100%;
                    display: flex;
                    align-items: end;
                    justify-content: center;
                    min-height: 5vh;
                    margin: 0 0 10pt 0;
                }
                .inner-container {
                    min-width: 400px;
                    width: 800px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                }
                a {
                    text-decoration: none;
                    font-size: 18pt;
                    color: #fff;
                    transition: all 0.2s ease;
                }
                a:hover {
                    font-weight: bold;
                    color: #fff;
                }
                .inactive {
                    color: #757a79;
                }
            `}
            </style>
        </div>
    )
}

export default Navigation