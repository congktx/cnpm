import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../Input"
import * as Yup from "yup"
import { fetchAPI } from "../../untils/fetchAPI";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { getDate } from "javascript-time-ago/gradation";


export function ThemNhanKhau({ setNhanKhaus, setOpenModal, nhanKhaus, quanHe }) {
    const [signupSchema, setSignupSchema] = useState(Yup.object().shape({}));
    const [gioiTinh, setGioiTinh] = useState()
    useEffect(() => {
        //console.log(1)
        var minNgaySinh = new Date("1-1-1900");
        var maxNgaySinh = new Date(Date.now());

        if (quanHe != "chủ hộ") {
            var ngaySinhChuHo = new Date(nhanKhaus[0].ngaySinh)
            if (quanHe == "bố" || quanHe == "mẹ") {
                maxNgaySinh = new Date(ngaySinhChuHo.getFullYear() - 10, ngaySinhChuHo.getMonth(), ngaySinhChuHo.getDate())
            }
            else if (quanHe == "em trai" || quanHe == "em gái") {
                minNgaySinh = ngaySinhChuHo
            }
            else if (quanHe == "anh" || quanHe == "chị") {
                maxNgaySinh = ngaySinhChuHo
            }
            else if (quanHe == "con trai" || quanHe == "con gái") {
                minNgaySinh = new Date(ngaySinhChuHo.getFullYear() + 10, ngaySinhChuHo.getMonth(), ngaySinhChuHo.getDate())
            }

            /////
            if (quanHe == "bố" || quanHe == "chồng" || quanHe == "anh" || quanHe == "em trai" || quanHe == "con trai")
                setGioiTinh("Nam")
            else setGioiTinh("Nữ")
        }


        setSignupSchema(Yup.object().shape({
            hoVaTen: Yup.string()
                .required('Required'),
            cccd: Yup.string()
                .required('Required')
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(12, 'Must be exactly 12 digits')
                .max(12, 'Must be exactly 12 digits'),
            diaChiHienTai: Yup.string()
                .required('Required'),
            ngaySinh: Yup.date()
                .max(maxNgaySinh, "Must older")
                .min(minNgaySinh, "Must younger")
                .required('Required'),
            nguyenQuan: Yup.string()
                .required('Required'),
            soHoChieu: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .required('Required'),
            tonGiao: Yup.string()
                .required('Required'),
            danToc: Yup.string()
                .required('Required'),
            quocTich: Yup.string()
                .required('Required'),
            noiThuongTru: Yup.string()
                .required('Required'),
            diaChiHienTai: Yup.string()
                .required('Required'),
            noiLamViec: Yup.string()
                .required('Required'),
            ngheNghiep: Yup.string()
                .required('Required'),
            trinhDoHocVan: Yup.string()
                .required('Required'),

        }))
    }, [quanHe])

    return <Formik
        initialValues={{
        }}
        validationSchema={signupSchema}
        onSubmit={async (values) => {
            console.log(100)
            try {
                console.log(values)
                const { result } = await fetchAPI(`/api/v1/nhankhau`, {
                    method: "POST",
                    token: localStorage.getItem("token"),
                    body: {
                        ...values,
                        quanHeVoiChuHo: quanHe,
                        gioiTinh: values.gioiTinh || gioiTinh,
                        ngaySinh: moment(values.ngaySinh + "Z").toISOString(),
                    }
                });
                console.log(result)
                setNhanKhaus([...nhanKhaus, result]);
                setOpenModal(false);
            } catch (err) {
                alert("Thêm nhân khẩu thất bại");
            }
        }
        }
    >
        {({ values }) =>
            <Form>
                <div class="flex-fill flex-column d-flex">

                    <div class="row mb-2">
                        <div class="col-2 flex-fill"><Input name="hoVaTen">Họ và tên</Input> </div>
                        <div class="col-2 flex-fill"><Input name="hoVaTenKhac">Họ và tên khác</Input></div>
                    </div>

                    <div class="row mb-2">
                        <div class="flex-fill col-2">
                            <div>Ngày Sinh</div>
                            <Field name="ngaySinh" type="date" class="rounded-2" />
                            <br></br>
                            <ErrorMessage name="ngaySinh">
                                {msg => <div class="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div class="flex-fill col-2">
                            <div>Giới tính</div>
                            <label className="mr-2">
                                {quanHe != "chủ hộ" && <Field type="radio" name="gioiTinh" value="Nam" checked={gioiTinh == "Nam"} />}
                                {quanHe == "chủ hộ" && <Field type="radio" name="gioiTinh" value="Nam" />}
                                <span>Nam</span>
                            </label>
                            <label className="space-x-3">
                                {quanHe != "chủ hộ" && <Field type="radio" name="gioiTinh" value="Nữ" checked={gioiTinh == "Nữ"} />}
                                {quanHe == "chủ hộ" && <Field type="radio" name="gioiTinh" value="Nữ" />}
                                <span>Nữ</span>
                            </label>
                            <ErrorMessage name="gioiTinh" />
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-2 flex-fill"><Input name="cccd" >CCCD</Input> </div>
                        <div class="col-2 flex-fill"><Input name="soHoChieu">Số hộ chiếu</Input></div>
                    </div>

                    <div class="row mb-2">
                        <div class="col-2 flex-fill"><Input name="nguyenQuan">Nguyên quán</Input> </div>
                        <div class="col-1 flex-fill"><Input name="tonGiao">Tôn giáo</Input> </div>
                        <div class="col-1 flex-fill"><Input name="danToc">Dân tộc</Input> </div>
                        <div class="col-2 flex-fill"><Input name="quocTich" >Quốc tịch</Input> </div>
                    </div>

                    <Input name="noiThuongTru">Nơi thường trú</Input>
                    <Input name="diaChiHienTai">Địa chỉ hiện tại</Input>
                    <Input name="noiLamViec">Nơi làm việc</Input>
                    <div class="row mb-2">
                        <div class="col-2 flex-fill">
                            <div class="flex-fill">
                                <div>Quan hệ với chủ hộ</div>
                                <Field name="quanHeVoiChuHo" class="rounded-2" value={quanHe} disabled></Field>
                            </div>
                        </div>
                        <div class="col-2 flex-fill"><Input name="ngheNghiep">Nghề nghiệp</Input> </div>
                        <div class="col-2 flex-fill"><Input name="trinhDoHocVan">Trình độ học vấn</Input> </div>

                    </div>

                </div>
                <button type="submit" class="btn btn-primary ">Submit</button>
            </Form>
        }
    </Formik >;
}

