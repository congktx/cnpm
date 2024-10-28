
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { fetchAPI } from "../../untils/fetchAPI.js";
import { Search } from "../../components/search/index.js";
import { useAuthContext } from "../../contexts/authContext.js";
function HoKhau() {
    const [hoKhaus, setHoKhaus] = useState([]);
    let navigate = useNavigate();
    const { token } = useAuthContext()
    useEffect(() => {
        //const { page = 1, search = "" } = context.query;
        const fetchHoKhaus = async () => {
            try {
                const {
                    result: { content: hoKhaus },
                    result: { totalPages },
                } = await fetchAPI("/api/v1/hokhau", {
                    //token: session.token,
                    params: { page: 0, size: 20, sort: "id,desc", keyword: "" },
                });
                console.log(hoKhaus)
                setHoKhaus(hoKhaus)
            } catch (err) {
                console.log(err)
            }
        }
        fetchHoKhaus()

    }, [])
    return (<div class="d-flex flex-fill flex-column">
        <Search api="/api/v1/hokhau" setData={setHoKhaus}></Search>
        <div class="mt-3 bg-white rounded-3 flex-fill p-3 flex-column d-flex">
            <span class="glyphicon glyphicon-envelope"></span>
            <div class="d-flex justify-content-between">
                <span class="ml-3 h3">Danh sách hộ khẩu</span>
                {token != undefined && <button class="btn btn-primary" onClick={() => navigate("./them")}>Thêm hộ khẩu mới</button>}
            </div>
            <hr></hr>
            <div class="row">
                <div class="col-1 flex-fill h5">Mã hộ khẩu</div>
                <div class="col-2 flex-fill h5">Chủ hộ</div>
                <div class="col-2 flex-fill  h5">Địa chỉ</div>
                <div class="col-1 flex-fill  h5 justify-content-center d-flex">Thao tác</div>
            </div>
            {
                hoKhaus.map(e =>
                    <div class="row">
                        <div class="col-1 flex-fill">{e.id}</div>
                        <div class="col-2 flex-fill ">{e.hoTenChuHo}</div>
                        <div class="col-2 flex-fill ">{e.diaChi}</div>
                        <div class="col-1 flex-fill justify-content-center d-flex">
                            <i class="bi bi-pencil-fill mr-1" onClick={() => navigate(`./${e.id}`)}></i>
                            {token != undefined && <i class="bi bi-file-earmark-excel-fill" onClick={() => {
                                try {
                                    fetchAPI(`/api/v1/hokhau/${e.id}`, {
                                        method: "DELETE",
                                        token: localStorage.getItem("token"),
                                    });
                                    setHoKhaus(hoKhaus.filter(value => value.id != e.id))
                                } catch (error) {
                                    alert(error)
                                }


                            }}></i>}
                        </div>
                    </div>
                )
            }
        </div>
    </div>)
}

export default HoKhau;