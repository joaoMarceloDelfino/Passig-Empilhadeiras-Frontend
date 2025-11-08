const UseBase64 = () => {

    const getBase64ImageUrl = (base64Url, extension) => {
        return `data:${getImageMimeType(extension)};base64,${base64Url}`
    }

    const getImageMimeType = (extension) => {
        switch(extension){
            case ".png": 
                return "image/png"
            case ".jpg":
            case ".jpeg":
                return "image/jpeg"
            case ".webp":
                return "image/webp"
        }   
    }

    return {getBase64ImageUrl}

}

export default UseBase64;