import axios from "../utils/axios";

export const getBanner = () => {
    return axios.get('/banner')
}

export const getPlaylist = () => {
    return axios.get('/personalized')
}

export const search = (params) => {
    return axios.get(`/search/multimatch?keywords=${params.keywords}`)
}

export const getArtists = () => {
    return axios.get('/top/artists')
}

export const login = (params) => {
    return axios.post('/login/cellphone', params)
}

export const logout = () => {
    return axios.get('/logout')
}

export const checkLogin = (params) => {
    return axios.post('/login/status?=timestamp=' + Date.now(), params);
}

export const playlistInfo = (params) => {
    return axios.get(`/playlist/detail?id=${params.id}`)
}

export const playlistDetail = (params) => {
    return axios.get(`/playlist/track/all?id=${params.id}`)
}

export const artistDesc = (params) => {
    return axios.get(`/artist/desc?id=${params.id}`)
}

export const artistDetail = (params) => {
    return axios.get(`/artist/detail?id=${params.id}`)
}

export const getArtistsSongs = (params) => {
    return axios.get(`/artists?id=${params.id}`)
}

export const getArtistCategory = (params) => {
    return axios.get(`/artist/list?type=${params.type}&area=${params.area}`)
}

export const getPlaylistCategory = () => {
    return axios.get('/playlist/catlist')
}

export const getTopPlaylist = (params) => {
    return axios.get(`/top/playlist?cat=${params.cat}`)
}

export const getComment = (params) => {
    return axios.get(`/comment/playlist?id=${params.id}`)
}

export const getMv = (params) => {
    return axios.get(`/personalized`)
}

