import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {Backdrop, CircularProgress, Pagination} from '@mui/material'
import Header from './components/Header/Header'
import CustomPaginationActionTable from './components/Table/Table'

import './App.scss'


const App = () => {

  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [applications, setApplications] = useState([])
  const [queryParams, setQueryParams] = useState({
    'page': 1,
    'take': 20,
    'name': searchValue,
    'hasChildren' : false,
    'accommodation': false,
    'transportation': false,
    'location city': true,
    'destination city': true,
    'status': 'New'
  })

  function changePage(_, page) {
    setQueryParams({
      ...queryParams,
      page
    })
  }

  function changeFilters(parameter) {
    if (parameter === 'hasChildren') {
      setQueryParams(prevState => ({...prevState, hasChildren: !prevState.hasChildren}))
    } else if (parameter === 'transportation') {
      setQueryParams(prevState => ({...prevState, transportation: !prevState.transportation}))
    } else if (parameter === 'accommodation') {
      setQueryParams(prevState => ({...prevState, accommodation: !prevState.accommodation}))
    }
  }

  function searchData(event) {
    event.preventDefault()
    setQueryParams({
      ...queryParams,
      name: searchValue
    })
    setSearchValue('')
  }

  function fetchData(url = '', params = queryParams) {
    axios.get(url, {
      method: 'GET',
      params
    }).then(response => {
      try {
        const applicationsList = response.data.map(fetchApplication => {
          return {
            ...fetchApplication,
            transport: fetchApplication.needs.includes('Помощь с транспортом'),
            accommodation: fetchApplication.needs.includes('Помощь с размещением')
          }
        })
        setApplications(applicationsList)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [queryParams])

  return (
    <div className="applications">

      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={isLoading}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>

      <Header/>

      <section className="applications__sub-header">
        <div className="applications__title-box wrapper">
          <h1 className="applications__title">Applications list</h1>
          <form className="applications__form" onSubmit={searchData}>
            <input
              className="applications__form-search"
              type="text"
              placeholder="Search all applications by name"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}/>
            <button className="applications__form-button" type="submit">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="25" viewBox="0 0 152 448">
                <path
                  d="M148.75 240c0 2-1 4.25-2.5 5.75l-116.5 116.5c-1.5 1.5-3.75 2.5-5.75 2.5s-4.25-1-5.75-2.5l-12.5-12.5c-1.5-1.5-2.5-3.5-2.5-5.75 0-2 1-4.25 2.5-5.75l98.25-98.25-98.25-98.25c-1.5-1.5-2.5-3.75-2.5-5.75s1-4.25 2.5-5.75l12.5-12.5c1.5-1.5 3.75-2.5 5.75-2.5s4.25 1 5.75 2.5l116.5 116.5c1.5 1.5 2.5 3.75 2.5 5.75z"></path>
              </svg>
            </button>
          </form>
        </div>
      </section>

      <section className="applications-filter">
        <div className="wrapper">
          <ul className="applications-filter__list">
            <li className="applications-filter__item">
              <button
                className={queryParams.hasChildren
                  ? 'applications-filter__button applications-filter__button_active'
                  : 'applications-filter__button'}
                onClick={() => changeFilters('hasChildren')}
              >With kids</button>
            </li>
            <li className="applications-filter__item">
              <button
                className={queryParams.transportation
                  ? 'applications-filter__button applications-filter__button_active'
                  : 'applications-filter__button'}
                onClick={() => changeFilters('transportation')}
              >Transport only</button>
            </li>
            <li className="applications-filter__item">
              <button
                className={queryParams.accommodation
                  ? 'applications-filter__button applications-filter__button_active'
                  : 'applications-filter__button'}
                onClick={() => changeFilters('accommodation')}
              >Accommodation only</button>
            </li>
          </ul>
        </div>
      </section>

      <section className="applications-list">
        <div className="wrapper">
          <CustomPaginationActionTable applicationList={applications} isLoading={isLoading}/>
          <Pagination className="pagination"
                      onChange={(event, value) => changePage(event, value)}
                      count={5}
                      defaultPage={1}
                      siblingCount={1}
                      boundaryCount={1}
                      color="primary"
          />
        </div>
      </section>

    </div>
  )
}

export default App