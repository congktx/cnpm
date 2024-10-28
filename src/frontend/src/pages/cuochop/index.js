import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { fetchAPI } from "../../untils/fetchAPI.js";
import { Search } from "../../components/search/index.js";
import { useAuthContext } from "../../contexts/authContext.js";
import moment from "moment";
function CuocHop() {
    const [cuocHops, setCuocHops] = useState([]);
    const navigate = useNavigate();
    const { token } = useAuthContext()
    useEffect(() => {
        const fetchCuocHops = async () => {
            try {
                const {
                    result: { content: cuocHops }
                } = await fetchAPI("/api/v1/cuochop", {
                    //token: session.token,
                    params: { page: 0, size: 20, sort: "id,desc", keyword: "" },
                });
                console.log(cuocHops)
                setCuocHops(cuocHops)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCuocHops()
    }, [])
    return (<div class="d-flex flex-fill flex-column">
        <Search api="/api/v1/cuochop" setData={setCuocHops}></Search>
        <div class="mt-3 bg-white rounded-3 flex-fill p-3">
            <div class="d-flex justify-content-between">
                <span class="ml-3 h3">Cuộc họp</span>
                <div class="d-flex">
                    {token != undefined && <button class="btn btn-primary mr-2" onClick={() => navigate("./them")}>Thêm cuộc họp mới</button>}
                    <button class="btn btn-success" onClick={() => navigate("./thongke")}>Thống kê</button>
                </div>

            </div>
            <hr></hr>
            <div class="row">
                <div class="col-1 flex-fill h5">Trạng thái</div>
                <div class="col-1 flex-fill h5">Người tạo</div>
                <div class="col-2 flex-fill h5">Tiêu đề</div>
                <div class="col-2 flex-fill h5">Thời gian</div>
                <div class="col-2 flex-fill h5">Địa điểm</div>
                <div class="col-1 flex-fill h5">Tham gia</div>
                <div class="col-1 flex-fill h5">Vắng mặt</div>
                <div class="col-1 flex-fill h5 justify-content-center d-flex">Thao tác</div>
            </div>
            {cuocHops.map(e => <div class="row">
                {new Date(e.thoiGian) < Date.now()
                    ? <div class="col-1 flex-fill text-success"> Đã diễn ra </div>
                    : <div class="col-1 flex-fill text-warning">Chưa diễn ra </div>}
                <div class="col-1 flex-fill">{e.nguoiTao}</div>
                <div class="col-2 flex-fill">{e.tieuDe}</div>
                <div class="col-2 flex-fill">{moment(e.thoiGian).format("DD-MM-YYYY")}</div>
                <div class="col-2 flex-fill">{e.diaDiem}</div>
                <div class="col-1 flex-fill">{e.thamGia}</div>
                <div class="col-1 flex-fill">{e.vangMat}</div>
                <div class="col-1 flex-fill justify-content-center d-flex">
                    <i class="bi bi-pencil-fill mr-1" onClick={() => navigate(`./${e.id}`)}></i>
                    {token != undefined && <i class="bi bi-file-earmark-excel-fill" onClick={() => {
                        fetchAPI(`/api/v1/cuochop/${e.id}`, {
                            method: "DELETE",
                            token: localStorage.getItem("token"),
                        });
                        setCuocHops(cuocHops.filter(value => value.id != e.id))
                    }}></i>}
                </div>
            </div>)}
        </div>
    </div>)

}

export default CuocHop;