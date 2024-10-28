
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { fetchAPI } from "../../untils/fetchAPI.js";

import { Search } from "../../components/search/index.js";
import { useAuthContext } from "../../contexts/authContext.js";
function NhanKhau() {
    const [nhanKhaus, setNhanKhaus] = useState([]);
    let navigate = useNavigate();
    const { token } = useAuthContext()
    useEffect(() => {
        //const { page = 1, search = "" } = context.query;
        const fetchNhanKhaus = async () => {
            try {
                const {
                    result: { content: nhanKhaus },
                    result: { totalPages },
                } = await fetchAPI("/api/v1/nhankhau", {
                    //token: session.token,
                    params: { page: 0, size: 20, sort: "id,desc", keyword: "" },
                });
                console.log(nhanKhaus)
                setNhanKhaus(nhanKhaus)
            } catch (err) {
                console.log(err)
            }
        }
        fetchNhanKhaus()

    }, [])
    return (<div class="d-flex flex-fill flex-column">
        <Search api="/api/v1/nhankhau" setData={setNhanKhaus}></Search>
        <div class="mt-3 bg-white rounded-3 flex-fill p-3 flex-column d-flex">
            <div class="d-flex">
                <span class="ml-3 h3">Danh sách nhân khẩu</span>
            </div>
            <hr></hr>
            <div class="row">
                <div class="col-1 flex-fill h5">ID</div>
                <div class="col-2 flex-fill h5">Họ tên</div>
                <div class="col-2 flex-fill h5">Mã CCCD</div>
                <div class="col-1 flex-fill h5">Giới tính</div>
                <div class="col-3 flex-fill h5">Địa chỉ</div>
                <div class="col-1 flex-fill h5 d-flex justify-content-center">Thao tác</div>

            </div>
            {
                nhanKhaus.map(e =>
                    <div class="row">
                        <div class="col-1 flex-fill">{e.id}</div>
                        <div class="col-2 flex-fill">{e.hoVaTen}</div>
                        <div class="col-2 flex-fill">{e.cccd}</div>
                        <div class="col-1 flex-fill">{e.gioiTinh}</div>
                        <div class="col-3 flex-fill">{e.diaChiHienTai}</div>
                        <div class="col-1 flex-fill d-flex justify-content-center">
                            <i class="bi bi-pencil-fill mr-1" onClick={() => navigate(`./${e.id}`)}></i>
                            {token != undefined && <i class="bi bi-file-earmark-excel-fill" onClick={() => {
                                fetchAPI(`/api/v1/nhankhau/${e.id}`, {
                                    method: "DELETE",
                                    token: localStorage.getItem("token"),
                                });
                                setNhanKhaus(nhanKhaus.filter(value => value.id != e.id))
                            }}></i>}
                        </div>
                    </div>
                )
            }
        </div>
    </div>)

}

export default NhanKhau;