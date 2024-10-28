import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import { Input } from "../../components/Input";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { ThemNhanKhau } from "../../components/themNhanKhau";
import { fetchAPI } from "../../untils/fetchAPI";
import { useNavigate } from "react-router-dom"

import moment from "moment";

function ThemHoKhau() {
    const [openModal, setOpenModal] = useState(false)
    const [nhanKhaus, setNhanKhaus] = useState([])
    const [quanHe, setQuanHe] = useState("chủ hộ")
    const navigate = useNavigate();
    return (<div class="d-flex flex-fill py-2">
        <div class="bg-white rounded-3 flex-fill p-3 mr-2 d-flex flex-column">
            <div class="d-flex align-items-center justify-content-between">
                <div class="h4">Danh sách thành viên trong hộ</div>
                <div class="d-flex">
                    <button class="btn btn-primary" onClick={() => setOpenModal(true)}>
                        {nhanKhaus.length == 0 ?
                            "Thêm chủ hộ"
                            : "Thêm thành viên"}
                    </button>

                    {nhanKhaus.length != 0 &&
                        <select class="ml-2 form-select" onChange={(event) => {
                            setQuanHe(event.target.value);
                        }}>
                            <option >Chọn quan hệ</option>
                            <option value="bố">bố</option>
                            <option value="mẹ">mẹ</option>
                            <option value="vợ">vợ</option>
                            <option value="chồng">chồng</option>
                            <option value="em trai">em trai</option>
                            <option value="em gái">em gái</option>
                            <option value="anh">anh</option>
                            <option value="chị">chị</option>
                            <option value="con trai">con trai</option>
                            <option value="con gái">con gái</option>
                        </select>}
                </div>

            </div>
            <hr></hr>
            <div class="row">
                <div class="col-2 flex-fill h5">Họ tên</div>
                <div class="col-2 flex-fill h5">Ngày sinh</div>
                <div class="col-1 flex-fill h5">Quan hệ với chủ hộ</div>
                <div class="col-1 flex-fill h5 justify-content-center d-flex">Thao tác</div>
            </div>
            <div class="flex-fill d-flex flex-column">
                {
                    nhanKhaus.map(e => <div class="row">
                        <div class="col-2 flex-fill">{e.hoVaTen}</div>
                        <div class="col-2 flex-fill">{moment(e.ngaySinh).format("DD-MM-YYYY")}</div>
                        <div class="col-1 flex-fill">{e.quanHeVoiChuHo}</div>
                        <div class="col-1 flex-fill justify-content-center d-flex">
                            <i class="bi bi-pencil-fill mr-1" onClick={() => navigate(`../../nhankhau/${e.id}`)}></i>
                            <i class="bi bi-file-earmark-excel-fill" onClick={() => {
                                try {
                                    setNhanKhaus(nhanKhaus.filter(value => value.id != e.id))
                                    fetchAPI(`/api/v1/nhankhau/${e.id}`, {
                                        method: "DELETE",
                                        token: localStorage.getItem("token"),
                                    });
                                }
                                catch {
                                    alert("Thêm hộ khẩu thất bại")
                                }

                            }}></i>
                        </div>
                    </div>)
                }
            </div>

            <hr></hr>
            <div class="justify-content-center d-flex">
                <button class="btn btn-danger mr-1" onClick={() => navigate("../")}>Huỷ</button>
                <button class="btn btn-primary " onClick={async () => {
                    try {
                        const { result } = await fetchAPI("/api/v1/hokhau", {
                            method: "POST",
                            body: {
                                hoTenChuHo: nhanKhaus[0].hoVaTen,
                                cccdChuHo: nhanKhaus[0].cccd,
                                diaChi: nhanKhaus[0].diaChiHienTai,
                                nhanKhaus: nhanKhaus.map((nhanKhau) => nhanKhau.id),
                            },
                            token: localStorage.getItem("token"),
                        });
                        navigate(`../${result.id}`)
                    } catch (err) {
                        console.log(err)
                        //setErrorMessage("Có lỗi xảy ra");
                    }
                }}>Thêm hộ khẩu</button>
            </div>
        </div>

        <Modal show={openModal}
            onHide={() => setOpenModal(false)}
            size="xl">
            <Modal.Header closeButton>
                <Modal.Title> Thêm nhân khẩu </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ThemNhanKhau setOpenModal={setOpenModal} setNhanKhaus={setNhanKhaus} nhanKhaus={nhanKhaus} quanHe={quanHe}></ThemNhanKhau>
            </Modal.Body>
        </Modal>


    </div >);
}

export default ThemHoKhau;