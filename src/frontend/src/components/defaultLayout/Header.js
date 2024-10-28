
function Header() {
    return <div class="d-flex align-items-center justify-content-end mt-2">
        <div class="input-group mr-2">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"></span>
            </div>
            <input type="text" class="form-control" placeholder="search" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div class="justify-content-end bg-white rounded-2">
            <button class="btn btn-outline-secondary " id="search-button" >Tìm kiếm</button>
        </div>
    </div>

}

export default Header;