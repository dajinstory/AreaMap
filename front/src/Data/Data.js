// react-select 목록
export const options = [
  { value: '200', label: '200M' },
  { value: '500', label: '500M' },
  { value: '1KM', label: '1KM' },
  { value: '2KM', label: '2KM' },
];

// react-select css 설정
export const selcetStyle = {
  option:(provided, state)=>({
    ...provided,
    width:"200px",
  }),
  container:(provided, state)=>({
    ...provided,
    width:"200px",
  }),
}