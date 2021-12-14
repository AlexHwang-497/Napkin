import {REJECTED_SYMBOL,AWAITING_SYMBOL,SUCCESS_SYMBOL} from '../constants/actionTypes'

const initalState = {
  loading: false,
  data: {
    labels: [],
    datasets: [{
      label: "PieGraph",
      data: [],
      backgroundColor: 'rgba(238,175,0, 0.4)',
      borderColor: 'rgba(238,175,0, 0.5)',
      pointBorderColor: 'rgba(238,175,0, 0.7)'
    }]
  }
};

const PieGraphReducer = (state = initalState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case AWAITING_SYMBOL:
      return {
        ...state,
        loading: true
      }
    case REJECTED_SYMBOL:
      return {
        ...state,
        loading: false,
      }
    case SUCCESS_SYMBOL:
      return {
        ...state,
        loading: false,
        data: {
          labels: payload.label,
          datasets: [{
            label: payload.label,
            fill: false,
            data: payload.data,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            // pointBorderColor: 'rgba(238,175,0, 0.7)'
          }]
        }
      }
    
    
    default:
      return state;
  }
  return state;
}

export default PieGraphReducer;
