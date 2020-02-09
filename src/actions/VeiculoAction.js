import axios from 'axios';

export const loadVeiculos = () => {
    return dispatch => {
        axios.get(`https://altimus-api.herokuapp.com/veiculos`)
            .then((res) => {
                dispatch({
                    type: 'LOAD_VEICULOS',
                    veiculos: res.data
                })
            })
    }
}

export const loadVeiculoByPlaca = (placa) => {
    return dispatch => {
        axios.get(`https://altimus-api.herokuapp.com/veiculos/${placa}`)
            .then((res) => {
                dispatch({
                    type: 'LOAD_VEICULOS_BY_PLACA',
                    veiculos: res.data
                })
            })
    }
}

export const mergeVeiculo = (veiculo) => {
    return dispatch => {
        axios.post('https://altimus-api.herokuapp.com/veiculos', veiculo)
            .then((res) => {
                dispatch(loadVeiculos())
            })
    }
}

export const deleteVeiculo = (codigo) =>{
    return dispatch =>{
        axios.delete(`https://altimus-api.herokuapp.com/veiculos/${codigo}`)
            .then((res) => {
                dispatch(loadVeiculos())
            }).catch(error => console.log(error))
    }
}

