import {FilterRequest, Tender} from "../../model";
import {ModelType, PaginationDataGrid} from "../paginationGrid";
import React, {useCallback, useEffect} from "react";
import {changeFilterTenders} from "../../redux/tender/reducers";
import {useAppDispatch, useAppSelector} from "../../redux/hook";

import {getTenders} from "../../redux/tender/actions";


export function TenderTable() {

  const tenderState = useAppSelector(state => state.tender);
  const dispatch = useAppDispatch();

  const fetchTenders = useCallback(() => {
    const filter = {
      ...tenderState.pagination,
      force: true
    } as FilterRequest
    dispatch(getTenders(filter))
    //eslint-disable-next-line
  }, [tenderState.pagination])

  useEffect(() => {
    fetchTenders();
    // eslint-disable-next-line
  }, [fetchTenders])


  const handleOnPageChange = (page:number) => {
    const filter = {
      ...tenderState.pagination,
      page: page+1
    }
    dispatch(changeFilterTenders(filter))
  }

  const handleOnPageSizeChange = (pageSize: number) => {
    const filter = {
      ...tenderState.pagination,
      page: 1,
      tot: pageSize
    }
    dispatch(changeFilterTenders(filter))
  }


  return <PaginationDataGrid <Tender> data={tenderState.allData}
                                      type={ModelType.TENDER}
                                      loading={tenderState.loading}
                                      rowId={row => row.code}
                                      onPageChange={handleOnPageChange}
                                      onPageSizeChange={handleOnPageSizeChange}/>
}