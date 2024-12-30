// import Header from "./Header";
import SideBar from "./SideBar";

function DefaultLayout({ children, path }) {
    return (

        <div class="d-flex">
            <SideBar />

            <div class="bg-content flex-fill p-3 d-flex flex-column">

                <div class="d-flex flex-fill">{children}</div>
            </div>

        </div>

    );
}

export default DefaultLayout;