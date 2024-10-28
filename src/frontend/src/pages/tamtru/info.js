import { useNavigate, useParams } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../../components/Input";
import { fetchAPI } from "../../untils/fetchAPI";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { tamvang } from "../../helper/mock";
import { useAuthContext } from "../../contexts/authContext";

function InfoTamTru() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tamTru, setTamTru] = useState({});
    const { token } = useAuthContext()
    useEffect(() => {
        const fetchTamTru = async () => {
            try {
                const { result: tamTru } = await fetchAPI(`/api/v1/tamtru/${id}`, {});
                setTamTru(tamTru)
            } catch (err) {
                console.log(err)
            }
        }
        fetchTamTru();
    }, [])
    return (<div class="mt-3 bg-white rounded-3 flex-fill p-3 flex-column d-flex">
        <Formik
            enableReinitialize
            initialValues={{
                ...tamTru,
                tuNgay: moment(tamTru.tuNgay).format("YYYY-MM-DD"),
                denNgay: moment(tamTru.denNgay).format("YYYY-MM-DD"),
            }}
            onSubmit={async (values) => {
                try {
                    const { result } = await fetchAPI(`/api/v1/tamtru/${id}`, {
                        method: "PUT",
                        token: localStorage.getItem("token"),
                        body: {
                            ...values,
                            tuNgay: moment(values.tuNgay + "Z").toISOString(),
                            denNgay: moment(values.denNgay + "Z").toISOString()
                        }
                    });
                    alert("Sửa tạm trú thành công")
                } catch (err) {
                    alert("Sửa tạm trú thất bại")
                }
            }
            }
        >
            {({ values }) =>
                <Form class="flex-fill d-flex flex-column">
                    <div class="flex-fill flex-column d-flex">
                        <div class="d-flex justify-content-between">
                            <div class="h4">Sửa tạm trú</div>
                            <button class="btn btn-danger" onClick={() => navigate("../")}>Quay lại</button>
                        </div>

                        <hr></hr>
                        <div class="row mb-2">
                            <div class="col-2 flex-fill"><Input name="hoVaTen">Họ và tên</Input> </div>
                            <div class="col-2 flex-fill"><Input name="cccd">CCCD</Input></div>
                        </div>



                        <div><Input name="diaChi">Địa chỉ đăng ký tạm trú</Input></div>

                        <div class="row mb-2">
                            <div class="col-2 flex-fill">
                                <Input name="tuNgay" type="date">Từ ngày</Input>

                            </div>
                            <div class="col-2 flex-fill">
                                <Input name="denNgay" type="date"> Đến ngày</Input>

                            </div>

                        </div>

                        <Input name="lyDo" component="textarea"> Nội dung</Input>
                        {token != undefined && <div><button type="submit" class="btn btn-primary ">Sửa</button></div>}
                    </div>

                </Form>
            }
        </Formik >
    </div >);
}

export default InfoTamTru;