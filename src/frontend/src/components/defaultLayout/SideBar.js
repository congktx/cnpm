import { Link, useNavigate } from "react-router-dom";
import publicRoutes from "../../routes";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { fetchAPI } from "../../untils/fetchAPI";
import { useAuthContext } from "../../contexts/authContext";
function SideBar() {
    const [openModal, setOpenModal] = useState(false)
    const { token, username, setToken, setUserName } = useAuthContext();
    return (<nav class="d-flex flex-column flex-shrink-0 p-3 min-vh-100">
        <div class="d-flex align-items-center">
            <i class="fa fa-address-card-o fa-2x mr-1 color-icon" ></i>
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
                {token == undefined
                    ? <button class="btn btn-outline-secondary m-2" onClick={() => setOpenModal(true)}>Đăng nhập</button>
                    : <div>
                        <div class="d-flex align-items-center">
                            <i class="fas fa-user-circle mr-1"></i>
                            <div class="h5">{username}</div>
                        </div>

                        <button class="btn btn-outline-secondary m-2" onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("name");
                            setUserName(undefined);
                            setToken(undefined);
                        }}>Đăng xuất</button>
                    </div>
                }

            </div>
        </div>
        <Modal show={openModal}
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
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" id="username" />
                    </div>
                    <div class="input-group my-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Password</span>
                        </div>
                        <input type="password" class="form-control" aria-label="Username" aria-describedby="basic-addon1" id="password" />
                    </div>
                    <div class="d-flex justify-content-center my-2">
                        <button class="btn btn-primary" onClick={async () => {
                            try {

                                const {
                                    result: { token: token, username: name },

                                } = await fetchAPI("/api/v1/auth/login", {
                                    method: "POST",
                                    body: {
                                        username: document.getElementById("username").value,
                                        password: document.getElementById("password").value
                                    }
                                });

                                localStorage.setItem("token", token);
                                localStorage.setItem("name", name)
                                setToken(token)
                                setUserName(name);
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