function check_error(response){
    let error_page_path = "/website/html/error_page.html"

    error_codes = [
        404,
        500
    ]
    if (error_codes.includes(response.status)){
        window.location.href = error_page_path
    }
}
