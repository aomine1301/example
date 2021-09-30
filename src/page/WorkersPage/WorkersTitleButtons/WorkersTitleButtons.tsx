import React, { memo } from 'react'
import SearchIconButton from '@components/iconButtons/SearchIconButton/SearchIconButton'
import AddIconButton from '@components/iconButtons/AddIconButton/AddIconButton'
import DepartmentButton from '@components/iconButtons/DepartmentButton/DepartmentButton'

interface Props {
  openModalAddEmployee: () => void
  openModalDepartment: () => void
  tooltipTitleAddButton: string
  tooltipTitleDepartment: string
}

const WorkersTitleButtons = ({ openModalAddEmployee, openModalDepartment, tooltipTitleAddButton, tooltipTitleDepartment }: Props) => (
  <>
    <SearchIconButton />
    <AddIconButton tooltipTitle={tooltipTitleAddButton} onClick={openModalAddEmployee} bigSize />
    <DepartmentButton tooltipTitle={tooltipTitleDepartment} onClick={openModalDepartment} bigSize />
  </>
)

export default memo(WorkersTitleButtons)
