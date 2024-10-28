import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchAPI } from "../../untils/fetchAPI";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export function ThongSoCuocHopTheoHoKhau() {
    const { id } = useParams();
    const [thongSoCuocHop, setThongSoCuocHop] = useState({
        cuocHopThamGia: [],
        cuocHopVangCoLyDo: [],
        cuocHopVangKhongLyDo: []
    });
    useEffect(() => {
        const fetchThongSoCuocHop = async () => {
            try {

                const {
                    result: thongSoCuocHop
                } = await fetchAPI(`/api/v1/cuochop/thongkenguoithamgia/${id}`, {
                    //token: session.token,
                    params: { months: '01', years: '2000' },
                });
                console.log(thongSoCuocHop)
                setThongSoCuocHop(thongSoCuocHop)

            } catch (err) {
                console.log(err)
            }
        }
        fetchThongSoCuocHop()
    }, [])

    return (
        <div class="d-flex flex-column">

            <div class="d-flex justify-content-center flex-fill bg-white rounded mb-2">
                <Pie
                    class="flex-fill"
                    data={{
                        labels: ["Tham gia", "Vắng có lý do", "Vắng không lý do"],
                        datasets: [
                            {
                                label: 'so luong',
                                data: [thongSoCuocHop.thamGia, thongSoCuocHop.vangCoLyDo, thongSoCuocHop.vangKhongLyDo],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',

                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',

                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}></Pie>
            </div>
            <div class="flex-fill rounded bg-white mb-2">
                <div class="h5">Các cuộc họp tham gia</div>
                <hr></hr>
                {
                    thongSoCuocHop.cuocHopThamGia.map(e =>
                        <div> {e.tieuDe}</div>)
                }
            </div>



            <div class="flex-fill rounded bg-white p-2 mb-2">
                <div class="h5">Vắng có lý do</div>
                <hr></hr>
                {
                    thongSoCuocHop.cuocHopVangCoLyDo.map(e =>
                        <div> {e.tieuDe}</div>)
                }
            </div>
            <div class="flex-fill rounded bg-white">
                <div class="h5">Vắng không lý do</div>
                <hr></hr>
                {
                    thongSoCuocHop.cuocHopVangKhongLyDo.map(e =>
                        <div> {e.tieuDe}</div>)
                }
            </div>

        </div>
    );
}

