import "../Styles/NavBar.Styles.css"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

const NavBar = () => {
    return (
        <header className="header">
            <div className="content">
                <div className="content-writing">
                    <h1>ThinkBoard</h1>
                    <div className="create-note">
                        <Link to={"/create"} className="link">
                        <PlusIcon className="PlusIcon" />
                        <span>New Note</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar