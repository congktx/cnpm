import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Input } from "../../components/Input";
import { fetchAPI } from "../../untils/fetchAPI";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import { DiemDanh } from "../../components/diemDanh";
import { useAuthContext } from "../../contexts/authContext";
function InfoCuocHop() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [cuocHop, setCuocHop] = useState({ hoKhaus: [] })
    const [danhSachThamGia, setDanhSachThamGia] = useState([]);
    const [diemDanh, setDiemDanh] = useState([])
    const { token } = useAuthContext();
    const fetchCuocHop = useCallback(async () => {
        try {
            const {
                result: cuocHop,
            } = await fetchAPI(`/api/v1/cuochop/${id}`, {
            });
            setCuocHop(cuocHop);
        } catch (err) {
            console.log(err)
        }
    }, [diemDanh])
    useEffect(() => {
        //const { page = 1, search = "" } = context.query;
        fetchCuocHop()
    }, [diemDanh, danhSachThamGia])

    useEffect(() => {
        //const { page = 1, search = "" } = context.query;
        const fetchDanhSachThamGia = async () => {
            try {
                const {
                    result: danhSachThamGia,
                } = await fetchAPI(`/api/v1/cuochop/danhsachthamgia/${id}`, {
                    //token: session.token,
                    //params: { page: 0, size: 5, sort: "id,desc", keyword: "" },
                });
                setDanhSachThamGia(danhSachThamGia);
            } catch (err) {
                console.log(err)
            }
        }
        fetchDanhSachThamGia()
    }, [])

    return (<div class="d-flex flex-fill py-2">
        <div class="bg-white rounded-3 flex-fill p-3 mr-2">
            <div class="h5">Chi tiết cuộc họp</div>
            <hr></hr>
            <Formik
                enableReinitialize
                initialValues={
                    {
                        ...cuocHop,
                        thoiGian: moment(cuocHop.thoiGian).format("YYYY-MM-DDThh:mm"),
                        hoKhaus: []
                    }
                }
                //validationSchema={SignupSchema}
                onSubmit={async (values) => {

                    try {
                        console.log(values, "abc")
                        const { result } = await fetchAPI(`/api/v1/cuochop/${id}`, {
                            method: "PUT",
                            body: {
                                ...values,
                                thoiGian: moment(values.thoiGian + "Z").toISOString(),
                            },
                            token: localStorage.getItem("token"),
                        });
                        alert("Sửa thành công")
                    } catch (err) {
                        alert("Sửa thất bại")
                        //setErrorMessage("Có lỗi xảy ra");
                    }
                }}
            >
                {({ values }) =>
                    <Form class="h-75 d-flex flex-column">
                        <div><Input name="tieuDe" >Tiêu đề</Input></div>
                        <div class="row mb-2">
                            <div class="col-2 flex-fill"> <Input name="diaDiem">Địa điểm</Input> </div>
                            <div class="col-2 flex-fill">
                                <Input name="thoiGian" type="datetime-local">Thời gian</Input>
                            </div>
                        </div>

                        <Input name="noiDung" component="textarea">Nội dung</Input>
                        <Input name="banBaoCao" component="textarea">Báo cáo cuộc họp</Input>



                        <div class="d-flex justify-content-center">
                            <button class="btn btn-danger mr-1" onClick={() => navigate("../")}>Quay lại</button>
                            {token != undefined && <button type="submit" class="btn btn-primary ">Sửa</button>}

                        </div>
                    </Form>
                }
            </Formik >
        </div>
        <div class="col-4 d-flex flex-column">
            <div class="bg-white rounded-3 p-3 mb-2">
                <div class="d-flex justify-content-between align-items-end">
                    <div class="h5">Thông số cuộc họp</div>
                    <button class="btn btn-warning" onClick={async () => {
                        try {
                            const {
                                result: diemDanh,
                            } = await fetchAPI(`/api/v1/cuochop/${id}/diemdanh`, {
                                //token: session.token,
                                //params: { page: 0, size: 5, sort: "id,desc", keyword: "" },
                            });
                            setDiemDanh(diemDanh);
                        } catch (err) {
                            console.log(err)
                        }
                        setOpenModal(true)
                    }
                    }>Điểm danh</button>
                </div>

                <hr></hr>
                <div>Số người tham gia: {cuocHop.thamGia}</div>
                <div>Số người vắng: {cuocHop.vangMat}</div>
            </div>
            <div class="bg-white rounded-3 p-3 flex-fill d-flex flex-column">
                <div class="h5">Danh sách người được mời</div>
                <hr></hr>
                <div class="flex-fill">
                    {danhSachThamGia.filter(e => e.invited).
                        map(e => <div class="d-flex justify-content-between">
                            <div class="">{e.hoTenChuHo}</div>
                            <input type="checkbox" checked onChange={() => {
                                setDanhSachThamGia(danhSachThamGia.map(value => {
                                    if (value.id == e.id) value.invited = false;
                                    return value;
                                }))
                            }} disabled={token == undefined}></input>
                        </div>)
                    }
                </div>
                <hr></hr>
                <div class="flex-fill">
                    {danhSachThamGia.filter(e => !e.invited).
                        map(e => <div class="d-flex justify-content-between">
                            <div class="">{e.hoTenChuHo}</div>
                            <input type="checkbox" onChange={() => {
                                setDanhSachThamGia(danhSachThamGia.map(value => {
                                    if (value.id == e.id) value.invited = true;
                                    return value;
                                }))
                            }} disabled={token == undefined}></input>
                        </div>)
                    }
                </div>
                <hr></hr>
                {
                    token != undefined &&
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary" onClick={async () => {
                            try {
                                await fetchAPI(`/api/v1/cuochop/danhsachthamgia/${id}`, {
                                    method: "POST",
                                    body: {
                                        hoKhaus: danhSachThamGia.filter(e => e.invited).map(e => e.id)
                                    },
                                    token: localStorage.getItem("token"),
                                });
                                alert("Cập nhật thành công")
                            } catch (err) {
                                alert("Cập nhật thất bại")
                                //setErrorMessage("Có lỗi xảy ra");
                            }
                        }}>Cập nhật</button>
                    </div>
                }

            </div>



            <Modal show={openModal}
                size="lg"
                onHide={() => setOpenModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Diem danh </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <DiemDanh diemDanh={diemDanh} setDiemDanh={setDiemDanh} setOpenModal={setOpenModal}></DiemDanh>
                </Modal.Body>
            </Modal>




        </div >
    </div >);
}

export default InfoCuocHop;