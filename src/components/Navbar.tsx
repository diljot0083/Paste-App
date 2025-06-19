import { NavLink } from "react-router-dom"

const Navbar = () => {
    return(
        <div className='flex flex-row gap-4 mb-3 place-content-evenly' >

            <NavLink to="/">
                Home
            </NavLink>

            <NavLink to="/pastes">
                Pastes
            </NavLink>

        </div>
    )
}
export default Navbar