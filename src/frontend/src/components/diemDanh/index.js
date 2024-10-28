import { useParams } from "react-router";
import { fetchAPI } from "../../untils/fetchAPI";
import { useAuthContext } from "../../contexts/authContext";
export function DiemDanh({ diemDanh, setDiemDanh }) {
    const { token } = useAuthContext();
    const { id } = useParams()
    return (
        <div>
            <div class="row">
                <div class="col-3 flex-fill h6"></div>
                <div class="col-1 flex-fill h6 d-flex justify-content-center">Tham gia</div>
                <div class="col-1 flex-fill h6 d-flex justify-content-center">Vắng</div>
                <div class="col-3 flex-fill h6 d-flex justify-content-center">Lý do</div>
                <div class="col-1"></div>
            </div>
            {
                diemDanh.map(e => <div class="row mb-2">
                    <div class="col-3 flex-fill">{e.hoTenChuHo}</div>
                    <div class="col-1 flex-fill d-flex justify-content-center">
                        <input type="radio" name={`diemDanh${e.hoKhau}`} class="input-green" checked={e.diemDanh}
                            onChange={() => {
                                setDiemDanh(diemDanh.map(value => {
                                    if (value.hoKhau == e.hoKhau) value.diemDanh = true;
                                    return value;
                                }))
                            }} disabled={token == undefined}></input>
                    </div>
                    <div class="col-1 flex-fill d-flex justify-content-center">
                        <input type="radio" name={`diemDanh${e.hoKhau}`} class="input-red" checked={!e.diemDanh}
                            onChange={() => {
                                setDiemDanh(diemDanh.map(value => {
                                    if (value.hoKhau == e.hoKhau) value.diemDanh = false;
                                    return value;
                                }))
                            }} disabled={token == undefined}></input>
                    </div>
                    <div class="col-3 flex-fill">
                        {
                            !e.diemDanh &&
                            <input class="rounded" onChange={(event) => {
                                setDiemDanh(diemDanh.map(value => {
                                    if (value.hoKhau == e.hoKhau) value.lyDo = event.target.value;
                                    return value;
                                }))
                            }} value={e.lyDo} disabled={token == undefined}></input>
                        }
                    </div>
                    <div class="col-1">
                        <i class="bi bi-arrow-bar-up" onClick={async () => {
                            try {
                                await fetchAPI(`/api/v1/cuochop/diemdanh`, {
                                    method: "POST",
                                    body: e,
                                    token: localStorage.getItem("token")
                                });
                                setDiemDanh([...diemDanh])
                                alert("Điểm danh thành công")
                            } catch (err) {
                                alert("Điểm danh thất bại")
                            }
                        }}></i>
                    </div>
                </div>)
            }
        </div >
    )
}

