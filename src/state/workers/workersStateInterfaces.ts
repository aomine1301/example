export interface DepartmentWorkersInterface {
  created_at: null | string
  updated_at: null | string
  name: '' | string
  id: 0 | number
}
//
export interface ItemWorkersInterface {
  id: number
  surname: string
  name: string
  lastname: string
  birth_date: string
  personal_phone: string
  corporate_phone: string
  local_phone: string
  email: string
  departament: DepartmentWorkersInterface
  departament_id: number
  role: string
  active: boolean
  login: string
  avatar: string
  created_at?: string
  updated_at?: string
  pics: Array<string>
}

//state interface
export interface StateWorkersInterface {
  isEmployeeLoading: boolean
  isDepartmentLoading: boolean
  department: DepartmentWorkersInterface[] | []
  workers: ItemWorkersInterface[] | []
  isHaveFirstLoading: boolean
  valueSelected: ValueSortSelectedWorkersType
}
export type ValueSortSelectedWorkersType = 'depName' | 'name' | 'surname' | 'birth_date'

export interface FormValuesWorkersInterface {
  active: boolean
  name: string
  surname: string
  lastname: string
  departament_id: number
  personal_phone: string
  corporate_phone: string
  local_phone: string
  email: string
  login: string
  password: string
  birth_date: string
  avatar: string
  pics: string[] | null
  role: string
}
export interface OptionSelectTableWorkersInterface {
  title: string
  value: string
  id: number
}
