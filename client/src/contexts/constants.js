export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'https://sleepy-inlet-56101.herokuapp.com/api'
        : 'deployURL';

export const LOCAL_STORAGE_TOKEN_NAME = 'mern-app';

export const POSTS_LOADED_SUCCESS = 'POST_LOADED_SUCCESS';
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const FIND_POST = 'FIND_POST';
