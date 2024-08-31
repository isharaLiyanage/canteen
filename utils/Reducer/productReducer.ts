

type StateType = {
  product_type: string | string[] | undefined;
  errorMassage: string[] | undefined;
  error: boolean;
  loading: boolean;
};
type Action = {
  type: "FETCH_START" | "FETCH_ErrorMassage" | "FETCH_PRODUCT_TYPE";

  payload?: string[];
};
export const INITIAL_STATE: StateType = {
  product_type: [],
  errorMassage: [],
  error: false,
  loading: false,
};

export const productReducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        product_type: [],
        errorMassage: [],
        error: false,
        loading: true,
      };

    case "FETCH_ErrorMassage":
      return {
        ...state,
        loading: false,
        errorMassage: action.payload,
        error: true,
      };
    case "FETCH_PRODUCT_TYPE":
      return {
        ...state,
        product_type: action.payload,
      };

    default:
      return state;
  }
};
