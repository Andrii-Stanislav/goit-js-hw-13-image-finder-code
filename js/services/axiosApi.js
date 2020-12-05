import axios from "axios";
import apiService from "./apiService"

axios.defaults.baseURL = "https://pixabay.com/api";

const fetchPhoto = async (text, page) => {
    const textOfUrl = `/?image_type=photo&orientation=horizontal&q=${text}&page=${page}&per_page=12&key=${apiService.key}`

    const data = await axios.get(textOfUrl);
    return data;
};

export default fetchPhoto;