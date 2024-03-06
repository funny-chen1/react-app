import { message } from 'antd';

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

export const setLocal = (key ,value) => {
    return localStorage.setItem(key, value)
}

export const getLocal = (key) => {
    return localStorage.getItem(key)
}
