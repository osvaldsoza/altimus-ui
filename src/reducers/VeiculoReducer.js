const INITIAL_STATE = {
    veiculos: [],
    isMergeVeiculo: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_VEICULOS':
            return {...state, veiculos: action.veiculos}
        case 'LOAD_VEICULOS_BY_PLACA':
            return {...state, veiculos: action.veiculos}
        default:
            return state
    }
}