import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../../components/Input";
import { fetchAPI } from "../../untils/fetchAPI";
import moment from "moment/moment";
import * as Yup from "yup"
const SignupSchema = Yup.object().shape({
    hoVaTen: Yup.string()
        .required('Required'),
    cccd: Yup.string()
        .required('Required')
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(12, 'Must be exactly 12 digits')
        .max(12, 'Must be exactly 12 digits'),
    diaChi: Yup.string()
        .required('Required'),

    tuNgay: Yup.date()
        .required('Required'),
    denNgay: Yup.date()
        .required('Required')
        .min(Yup.ref('tuNgay'), "after start day")

});

function ThemTamTru() {
    const navigate = useNavigate();
    return (<div class="mt-3 bg-white rounded-3 flex-fill p-3 flex-column d-flex">
        <Formik
            initialValues={{
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
                try {
                    const { result } = await fetchAPI(`/api/v1/tamtru`, {
                        method: "POST",
                        token: localStorage.getItem("token"),
                        body: {
                            ...values,
                            tuNgay: moment(values.tuNgay + "Z").toISOString(),
                            denNgay: moment(values.denNgay + "Z").toISOString()
                        }
                    });
                    navigate(`../${result.id}`)
                } catch (err) {
                    alert("Thêm tạm trú thất bại")
                }
            }
            }
        >
            {({ values }) =>
                <Form class="flex-fill d-flex flex-column">
                    <div class="flex-fill flex-column d-flex">
                        <div class="d-flex justify-content-between">
                            <div class="h4">Đăng ký tạm trú </div>
                            <button class="btn btn-danger" onClick={() => navigate("../")}>Huỷ</button>
                        </div>

                        <hr></hr>
                        <div class="row mb-2">
                            <div class="col-2 flex-fill"><Input name="hoVaTen">Họ và tên</Input> </div>
                            <div class="col-2 flex-fill"><Input name="cccd">CCCD</Input></div>
                        </div>



                        <div><Input name="diaChi">Địa chỉ đăng ký tạm trú</Input></div>

                        <div class="row mb-2">
                            <div class="col-2 flex-fill">
                                <div>Từ ngày</div>
                                <Field name="tuNgay" type="date" class="rounded-2" />
                                <ErrorMessage name="tuNgay">
                                    {msg => <div class="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>
                            <div class="col-2 flex-fill">
                                <div>Đến ngày</div>
                                <Field name="denNgay" type="date" class="rounded-2" />
                                <ErrorMessage name="denNgay">
                                    {msg => <div class="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>

                        </div>

                        <div class="h5">Nội dung</div>
                        <Field name="lyDo" component="textarea" class="rounded-3 flex-fill mb-2"></Field>
                        <div><button type="submit" class="btn btn-primary ">Thêm</button></div>
                    </div>

                </Form>
            }
        </Formik >
    </div >);
}

export default ThemTamTru;