import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
const { Column } = Table
import { useTranslation } from 'react-i18next'
import { AppStateInterface } from '@state/_store/createRootReducer'
import { ItemWorkersInterface, ValueSortSelectedWorkersType } from '@state/workers/workersStateInterfaces'
import { loadingListDepartmentWorkersAction, loadingListWorkersAction } from '@state/workers/workersStateSlice'
import TableLoadingSpin from '@components/spins/TableLoadingSpin/TableLoadingSpin'
import WorkersTitleButtons from '@page/WorkersPage/WorkersTitleButtons/WorkersTitleButtons'
import WorkersModalAddEmployee from '@page/WorkersPage/WorkersModalAddEmployee/WorkersModalAddEmployee'
import WorkersDepartmentsModal from '@page/WorkersPage/WorkersDepartmentsModal/WorkersDepartmentsModal'
import WorkersMakeButtons from '@page/WorkersPage/WorkersMakeButtons/WorkersMakeButtons'
import PageWrapper from '@components/wrappes/PageWrapper/PageWrapper'
import WorkersSortInput from '@page/WorkersPage/WorkersSortInput/WorkersSortInput'
import {
  WorkersAvatarColumnMemo,
  WorkersLoginEmailColumnMemo,
  WorkersNameFieldColumnMemo,
  WorkersTelColumnMemo,
} from '@page/WorkersPage/WorkersColumnsComponents/WorkersColumsComponents'
import LoadingSpin from '@components/spins/LoadingSpin/LoadingSpin'

const WorkersPage = () => {
  const [isVisibleModalAddWorkers, setIsVisibleModalAddWorkers] = useState<boolean>(false) // локальное состояние на модальное окно добавления работников
  const [isVisibleModalDepartment, setIsVisibleModalDepartment] = useState<boolean>(false) // локальное состояние на модальное окно департаментов

  const { workers, isHaveFirstLoading, isEmployeeLoading, valueSelected } = useSelector((state: AppStateInterface) => state.workers) // получаем список работников,toggle окна создания работника,toggle загрузки работников,
  // toggle окна департамента,значение сортировки работников
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingListWorkersAction()) //запрос на получение работников
  }, [dispatch])

  useEffect(() => {
    dispatch(loadingListDepartmentWorkersAction()) //запрос на получение отделов
  }, [dispatch])

  const changeOpenModalEmployeeHandler = (isOpen: boolean) => () => {
    setIsVisibleModalAddWorkers(isOpen)
  }
  const changeOpenModalDepartmentHandler = (isOpen: boolean) => () => {
    setIsVisibleModalDepartment(isOpen)
  }

  // сортировка пользователей в таблице
  const sortedWorkers = useMemo(() => {
    const sort: ValueSortSelectedWorkersType = valueSelected
    if (workers && sort) {
      if (sort === 'depName') {
        return [...workers].sort((a: ItemWorkersInterface, b: ItemWorkersInterface) => a?.departament?.name.localeCompare(b?.departament?.name))
      }
      return [...workers].sort((a: ItemWorkersInterface, b: ItemWorkersInterface) => a[sort]?.localeCompare(b[sort]))
    }
  }, [valueSelected, workers])

  const { t: em } = useTranslation('employee')
  const { t } = useTranslation('common')

  return (
    <PageWrapper
      title={em('list-workers')}
      titleButtonsComponent={
        <WorkersTitleButtons
          openModalAddEmployee={changeOpenModalEmployeeHandler(true)}
          openModalDepartment={changeOpenModalDepartmentHandler(true)}
          tooltipTitleAddButton={em('adding-a-new-worker')}
          tooltipTitleDepartment={em('departments')}
        />
      }
    >
      <LoadingSpin isLoading={isEmployeeLoading} top={250} isHaveFirstLoading={isHaveFirstLoading} />
      {isHaveFirstLoading && (
        <>
          <WorkersSortInput />
          <WorkersModalAddEmployee visible={isVisibleModalAddWorkers} onCancel={changeOpenModalEmployeeHandler(false)} />
          <WorkersDepartmentsModal visible={isVisibleModalDepartment} onCancel={changeOpenModalDepartmentHandler(false)} />
          <TableLoadingSpin isLoading={isEmployeeLoading} />
          <Table rowKey='id' pagination={{ defaultPageSize: 8, hideOnSinglePage: true }} dataSource={sortedWorkers}>
            <Column title={t('avatar')} key='avatar' render={({ avatar }: ItemWorkersInterface) => <WorkersAvatarColumnMemo avatar={avatar} />} />
            <Column
              title={em('full-name/department')}
              key='name'
              render={({ name, surname, lastname, departament }: ItemWorkersInterface) => (
                <WorkersNameFieldColumnMemo name={name} surname={surname} lastname={lastname} department={departament} />
              )}
            />
            <Column
              title={em('login/e-mail')}
              key='login'
              render={({ active, email, login }: ItemWorkersInterface) => <WorkersLoginEmailColumnMemo login={login} email={email} active={active} />}
            />
            <Column
              title={em('numbers-phones')}
              key='phones'
              render={({ personal_phone, corporate_phone, local_phone }: ItemWorkersInterface) => (
                <WorkersTelColumnMemo personal_phone={personal_phone} corporate_phone={corporate_phone} local_phone={local_phone} />
              )}
            />
            <Column title={t('actions')} key='itemWorkers' render={(item: ItemWorkersInterface) => <WorkersMakeButtons item={item} />} />
          </Table>
        </>
      )}
    </PageWrapper>
  )
}
export default memo(WorkersPage)
