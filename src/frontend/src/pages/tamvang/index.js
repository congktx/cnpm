import { tamvang } from "../../helper/mock.js"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { fetchAPI } from "../../untils/fetchAPI.js";
import { useAuthContext } from "../../contexts/authContext.js";
import moment from "moment";
function TamVang() {
    let navigate = useNavigate();
    const { token } = useAuthContext()
    const [tamVangs, setTamVangs] = useState([])
    useEffect(() => {
        const fetchTamVangs = async () => {
            const {
                result: { content: tamVangs }
            } = await fetchAPI(`/api/v1/tamvang`, {
                method: "GET",
                params: { page: 0, size: 20, sort: "id,desc", keyword: "" },
            })
            setTamVangs(tamVangs);
        }
        fetchTamVangs();
    }, [])
    return (<div class="mt-3 bg-white rounded-3 flex-fill p-3 flex-column d-flex">
        <div class="d-flex justify-content-between">
            <span class="ml-3 h3">Danh sách tạm vắng</span>
            {token != undefined && <button class="btn btn-primary" onClick={() => navigate("./them")}>Thêm tạm vắng</button>}
        </div>
        <hr></hr>
        <div class="row">
            <div class="col-1 flex-fill h5">ID</div>
            <div class="col-2 flex-fill h5">Họ tên</div>
            <div class="col-1 flex-fill h5">Mã CCCD</div>
            <div class="col-2 flex-fill h5">Địa chỉ</div>
            <div class="col-2 flex-fill h5">Lý do</div>
            <div class="col-1 flex-fill h5">Từ ngày</div>
            <div class="col-1 flex-fill h5">Đến ngày</div>
            <div class="col-1 flex-fill h5 d-flex justify-content-center">Thao tác</div>

        </div>
        {
            tamVangs.map(e =>
                <div class="row">
                    <div class="col-1 flex-fill">{e.id}</div>
                    <div class="col-2 flex-fill">{e.hoVaTen}</div>
                    <div class="col-1 flex-fill">{e.cccd}</div>
                    <div class="col-2 flex-fill">{e.diaChi}</div>
                    <div class="col-2 flex-fill">{e.lyDo}</div>
                    <div class="col-1 flex-fill">{moment(e.tuNgay).format("DD-MM-YYYY")}</div>
                    <div class="col-1 flex-fill">{moment(e.denNgay).format("DD-MM-YYYY")}</div>
                    <div class="col-1 flex-fill d-flex justify-content-center">
                        <i class="bi bi-pencil-fill mr-1" onClick={() => navigate(`./${e.id}`)}></i>
                        {token != undefined && <i class="bi bi-file-earmark-excel-fill" onClick={() => {
                            fetchAPI(`/api/v1/tamvang/${e.id}`, {
                                method: "DELETE",
                                token: localStorage.getItem("token"),
                            });
                            setTamVangs(tamVangs.filter(value => value.id != e.id))
                        }}></i>}
                    </div>

                </div>
            )
        }
    </div>)
}

export default TamVang;