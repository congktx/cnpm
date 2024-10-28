import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Input } from "../../components/Input";
import { fetchAPI } from "../../untils/fetchAPI";
import moment from "moment/moment";
import * as Yup from "yup"
const SignupSchema = Yup.object().shape({
    tieuDe: Yup.string()
        .required('Required'),
    diaDiem: Yup.string()
        .required('Required'),
    thoiGian: Yup.date()
        .required('Required')
        .min(new Date(Date.now()), "Must after now"),


});


function ThemCuocHop() {
    const navigate = useNavigate()
    const [inviteAll, setInviteAll] = useState(true)
    const [hoKhaus, setHoKhaus] = useState([]);
    const [hoKhauIds, setHoKhauIds] = useState([]);
    useEffect(() => {
        //const { page = 1, search = "" } = context.query;
        const fetchHoKhaus = async () => {
            try {
                const {
                    result: { content: hoKhaus },
                    result: { totalPages },
                } = await fetchAPI("/api/v1/hokhau", {
                    //token: session.token,
                    params: { page: 0, size: 5, sort: "id,desc", keyword: "" },
                });

                setHoKhaus(hoKhaus)
                setHoKhauIds(hoKhaus.map(e => e.id))
            } catch (err) {
                console.log(err)
            }
        }
        fetchHoKhaus()
    }, [])

    return (<div class="d-flex flex-fill py-2">
        <div class="bg-white rounded-3 flex-fill p-3 mr-2">
            <div class="h5">Thêm cuộc họp</div>
            <hr></hr>
            <Formik
                enableReinitialize
                validationSchema={SignupSchema}
                initialValues={{
                    nguoiTao: localStorage.getItem("name")
                }}
                //validationSchema={SignupSchema}
                onSubmit={async (values) => {

                    try {


                        const { result } = await fetchAPI("/api/v1/cuochop", {
                            method: "POST",
                            body: {
                                ...values,
                                thoiGian: moment(values.thoiGian + "Z").toISOString(),
                                hoKhaus: hoKhauIds,
                            },
                            token: localStorage.getItem("token"),

                        });
                        navigate(`../${result.id}`)
                    } catch (err) {
                        alert("Thêm cuộc họp thất bại")
                    }
                }}
            >
                {({ values }) =>
                    <Form class="h-75 d-flex flex-column">
                        <div><Input name="tieuDe" >Tiêu đề</Input></div>
                        <div class="row mb-2">
                            <div class="col-2 flex-fill"> <Input name="diaDiem">Địa điểm</Input> </div>
                            <div class="col-2 flex-fill">
                                <div class="h6">Thời gian</div>
                                <Field name="thoiGian" type="datetime-local" class="rounded-3"></Field>
                                <ErrorMessage name="thoiGian">
                                    {msg => <div class="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>
                        </div>


                        <div>Nội dung</div>
                        <Field name="noiDung" component="textarea" class="rounded-3 w-100 flex-fill mb-2"></Field>

                        <div class="d-flex justify-content-center">

                            <label className="mr-2">
                                <input type="radio" name="invite" value="all" checked={inviteAll}
                                    onChange={() => {
                                        setInviteAll(true)
                                        setHoKhauIds(hoKhaus.map(e => e.id))
                                    }
                                    } />
                                <span>Mời tất cả</span>
                            </label>
                            <label className="space-x-3">
                                <input type="radio" name="invite" value="notAll" checked={!inviteAll}
                                    onChange={() => {
                                        setInviteAll(false);
                                        setHoKhauIds([])
                                    }
                                    } />
                                <span>Mời từng người</span>
                            </label>
                            <ErrorMessage name="gioiTinh" />
                        </div>

                        <div class="d-flex justify-content-center">
                            <button class="btn btn-danger mr-1" onClick={() => navigate("../")}>Huỷ</button>
                            <button type="submit" class="btn btn-primary ">Thêm</button>
                        </div>
                    </Form>
                }
            </Formik >
        </div>
        <div class="bg-white rounded-3 p-3 col-4">

            <div class="h5">Danh sách người được mời</div>


            <hr></hr>
            <div class="overflow-auto">
                {inviteAll && hoKhaus.map(e => <div>
                    <div>{e.hoTenChuHo}</div>
                </div>)
                }

                {!inviteAll && hoKhaus.map(e => <div class="d-flex justify-content-between">
                    <div class="mr-2">{e.hoTenChuHo}</div>
                    <input type="checkbox" onChange={() => {
                        if (hoKhauIds.includes(e.id)) setHoKhauIds(hoKhauIds.filter(value => value != e.id))
                        else setHoKhauIds([...hoKhauIds, e.id])
                    }}></input>
                </div>)
                }
            </div>


        </div >
    </div >);
}

export default ThemCuocHop;