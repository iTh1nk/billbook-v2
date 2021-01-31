type State = {
  tab: string;
  isLoading: boolean;
  error: string;
  success: string;
  date: string;
  amount: string;
  totalBalance: string;
  selectedDate: Date;
};

type Action =
  | { type: "submitting" | "success" | "reset" }
  | { type: "error"; payload: string }
  | { type: "tab"; tabName: string }
  | { type: "field"; fieldName: string; payload: string }
  | { type: "selectDate"; payload: Date };

export const initialState: State = {
  tab: "home",
  isLoading: false,
  error: "",
  success: "",
  date: "",
  amount: "",
  totalBalance: "",
  selectedDate: new Date(),
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "tab":
      return {
        ...state,
        tab: action.tabName,
      };
    case "selectDate":
      return {
        ...state,
        selectedDate: action.payload,
      };
    case "success":
      return {
        ...state,
        selectedDate: new Date(),
        errors: "",
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "reset":
      return {
        ...state,
        error: "",
        selectedDate: new Date(),
      };
  }
}
