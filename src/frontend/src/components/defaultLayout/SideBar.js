import { Link } from "react-router-dom";
import publicRoutes from "../../routes";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { fetchAPI } from "../../untils/fetchAPI";
import { useAuthContext } from "../../contexts/authContext";
function SideBar() {
    const [openModal, setOpenModal] = useState(false);
    const { token, setToken, username, setUserName } = useAuthContext();

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            try {

                const {
                    result
                } = await fetchAPI("/api/v1/auth/login", {
                    method: "POST",
                    body: {
                        username: document.getElementById("username").value,
                        password: document.getElementById("password").value
                    }
                });

                localStorage.setItem("token", result.token);
                localStorage.setItem("name", result.username)
                setToken(result.token)
                setUserName(result.username);
                setOpenModal(false)
            } catch (err) {
            }
        }
    }

    return (<nav class="d-flex flex-column flex-shrink-0 p-3 min-vh-100">
        <div class="d-flex align-items-center">
            <i class="fa fa-id-card-o fa-2x mr-1 color-icon" ></i>
            <span class="fs-4 fw-bolder color-2">Manager</span>
        </div>
        <hr></hr>

        <ul class="nav nav-pills flex-column mb-auto">
            {
                publicRoutes.map((route, index) => {

                    return <div key={index}>
                        <Link to={route.path} className="nav-link link d-flex align-items-center">

                            <i class={route.icon + " mr-1"}></i>
                            <div>{route.name}</div>
                        </Link>
                    </div>
                })
            }
        </ul>
        <div class="dropdown border-top">
            <div class="justify-content-end bg-white rounded-2">
                {(typeof token === "string" && token.length > 0)
                    ? <div>
                        <div class="d-flex align-items-center">
                            <i class="fa fa-user-circle fa-2x mr-2 mt-2"></i>
                            <div class="h5 mt-2">{username}</div>
                        </div>

                        <button class="btn btn-outline-secondary m-2" onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("name");
                            setUserName(undefined);
                            setToken(undefined);
                        }}>Đăng xuất</button>
                    </div>
                    : <button class="btn btn-outline-secondary m-2" onClick={() => setOpenModal(true)}>Đăng nhập</button>
                }

            </div>
        </div>
        <Modal
            show={openModal}
            onHide={() => setOpenModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title> Đăng nhập </Modal.Title>
            </Modal.Header>
            <Modal.Body class="d-flex justify-content-center">
                <div class="d-flex flex-column mt-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Username</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" id="username" onKeyDown={handleKeyDown} />
                    </div>
                    <div class="input-group my-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Password</span>
                        </div>
                        <input type="password" class="form-control" aria-label="Username" aria-describedby="basic-addon1" id="password" onKeyDown={handleKeyDown} />
                    </div>
                    <div class="d-flex justify-content-center my-2">
                        <button class="btn btn-primary" onClick={async () => {
                            try {

                                const {
                                    result

                                } = await fetchAPI("/api/v1/auth/login", {
                                    method: "POST",
                                    body: {
                                        username: document.getElementById("username").value,
                                        password: document.getElementById("password").value
                                    }
                                });

                                localStorage.setItem("token", result.token);
                                localStorage.setItem("name", result.username)
                                setToken(result.token)
                                setUserName(result.name);
                                setOpenModal(false)
                            } catch (err) {
                                alert("Đăng nhập thất bại");
                            }

                        }
                        }> Đăng nhập</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </nav >);
}

export default SideBar;