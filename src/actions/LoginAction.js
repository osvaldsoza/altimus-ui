import axios from 'axios';

export const loadLogin = (login) => {
    return dispatch => {
        axios.get(`http://localhost:8080/usuarios/${login}`)
            .then((res) => {
                dispatch({
                    type: 'LOAD_LOGIN',
                    login: res
                })
            })
    }
}