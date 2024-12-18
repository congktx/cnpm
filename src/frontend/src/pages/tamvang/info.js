import { useNavigate, useParams } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../../components/Input";
import { fetchAPI } from "../../untils/fetchAPI";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
function InfoTamVang() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tamVang, setTamVang] = useState({});
    const { token } = useAuthContext()
    useEffect(() => {
        const fetchTamVang = async () => {
            try {
                const { result: tamVang } = await fetchAPI(`/api/v1/tamvang/${id}`, {});
                setTamVang(tamVang)
            } catch (err) {
                console.log(err)
            }
        }
        fetchTamVang();
    }, [])
    return (<div class="mt-3 bg-white rounded-3 flex-fill p-3 flex-column d-flex">
        <Formik
            enableReinitialize
            initialValues={{
                ...tamVang,
                tuNgay: moment(tamVang.tuNgay).format("YYYY-MM-DD"),
                denNgay: moment(tamVang.denNgay).format("YYYY-MM-DD"),
            }}
            onSubmit={async (values) => {
                try {
                    const { result } = await fetchAPI(`/api/v1/tamvang/${id}`, {
                        method: "PUT",
                        token: localStorage.getItem("token"),
                        body: {
                            ...values,
                            tuNgay: moment(values.tuNgay + "Z").toISOString(),
                            denNgay: moment(values.denNgay + "Z").toISOString()
                        }
                    });
                    alert("Sửa tạm vắng thành công")
                } catch (err) {
                    alert("Sửa tạm vắng thất bại")
                }
            }
            }
        >
            {({ values }) =>
                <Form class="flex-fill d-flex flex-column">
                    <div class="flex-fill flex-column d-flex">
                        <div class="d-flex justify-content-between">
                            <div class="h4">Thông tin tạm vắng </div>
                            <button class="btn btn-danger" onClick={() => navigate("../")}>Quay lại</button>
                        </div>

                        <hr></hr>
                        <div class="row mb-2">
                            <div class="col-2 flex-fill"><Input name="hoVaTen">Họ và tên</Input> </div>
                            <div class="col-2 flex-fill"><Input name="cccd">CCCD</Input></div>
                        </div>



                        <div><Input name="diaChi">Địa chỉ đăng ký tạm vắng</Input></div>
                        <div class="row mb-2">
                            <div class="col-2 flex-fill">
                                <Input name="tuNgay" type="date">Từ ngày</Input>

                            </div>
                            <div class="col-2 flex-fill">
                                <Input name="denNgay" type="date"> Đến ngày</Input>

                            </div>

                        </div>

                        <Input name="lyDo" component="textarea"> Lý do tạm vắng</Input>

                        {token != undefined && <div><button type="submit" class="btn btn-primary ">Sửa</button></div>}
                    </div>

                </Form>
            }
        </Formik >
    </div >);
}

export default InfoTamVang;