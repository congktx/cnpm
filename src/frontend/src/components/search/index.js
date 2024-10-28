import { fetchAPI } from "../../untils/fetchAPI";

export function Search({ setData, api }) {
    return (<div class="d-flex align-items-center mt-2">
        <div class="input-group mr-2">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"></span>
            </div>
            <input type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" id="search-input" />
        </div>
        <div class="justify-content-end bg-white rounded-2">
            <button class="btn btn-outline-secondary " onClick={async () => {
                try {

                    const {
                        result: { content: data },

                    } = await fetchAPI(api, {
                        //token: session.token,
                        params: { page: 0, size: 5, sort: "id,desc", keyword: document.getElementById("search-input").value },
                    });

                    setData(data);
                } catch (err) {
                    console.log(err)
                }
            }} >Tìm kiếm</button>
        </div>
    </div>);
}

