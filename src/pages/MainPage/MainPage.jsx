import './MainPage.scss'
import Header from '../../components/Header/Header'
import React, {useEffect, useState} from 'react'
import CustomPaginationActionsTable from '../../components/Table/Table'
import {Backdrop, CircularProgress, Pagination} from '@mui/material'
import axios from 'axios'

const MainPage = () => {

  const fetchApplicationsList = [
    {
      'id': 'b2cce6e4-413b-406a-901a-5ca9c2ce950b',
      'fullName': 'Iwan Iwanowich Iwanow',
      'dateOfBirth': '1980-01-01',
      'gender': 'men',
      'languages': [
        'Украинский',
        'Английский',
        'Польский',
        'Русский'
      ],
      'citizenship': 'Ukraine',
      'phoneNumber': '+48000000001',
      'numberOfAdults': 2,
      'numberOfChildren': 3,
      'animals': true,
      'currentLocation': 'Przemysl',
      'destinationLocation': 'Warsaw',
      'needs': [
        'Помощь с транспортом'
      ],
      'description': 'lorem ipsum',
      'createdAt': '2022-02-01T14:00:00Z',
      'updatedAt': '2022-03-06T10:07:32.168114Z'
    },
    {
      'id': 'b2cce6e4-413b-406a-901a-5ca9c2ce950b',
      'fullName': 'Iwan Iwanowich Iwanow',
      'dateOfBirth': '1980-01-01',
      'gender': 'men',
      'languages': [
        'Украинский',
        'Английский',
        'Польский',
        'Русский'
      ],
      'citizenship': 'Ukraine',
      'phoneNumber': '+48000000001',
      'numberOfAdults': 2,
      'numberOfChildren': 0,
      'animals': true,
      'currentLocation': 'Przemysl',
      'destinationLocation': 'Warsaw',
      'needs': [
        ''
      ],
      'description': 'lorem ipsum',
      'createdAt': '2022-03-06T14:00:00Z',
      'updatedAt': '2022-03-06T10:07:32.168114Z'
    },
    {
      'id': 'b2cce6e4-413b-406a-901a-5ca9c2ce950b',
      'fullName': 'Petr Petrovich Petrov',
      'dateOfBirth': '1980-01-01',
      'gender': 'men',
      'languages': [
        'Украинский',
        'Английский',
        'Польский',
        'Русский'
      ],
      'citizenship': 'Ukraine',
      'phoneNumber': '+48000000001',
      'numberOfAdults': 2,
      'numberOfChildren': 1,
      'animals': true,
      'currentLocation': 'Przemysl',
      'destinationLocation': 'Warsaw',
      'needs': [
        'Помощь с размещением'
      ],
      'description': 'lorem ipsum',
      'createdAt': '2022-02-01T14:00:00Z',
      'updatedAt': '2022-03-06T10:07:32.168114Z'
    },
    {
      'id': 'b2cce6e4-413b-406a-901a-5ca9c2ce950b',
      'fullName': 'Sidor Sidorovich Sidorov',
      'dateOfBirth': '1980-01-01',
      'gender': 'men',
      'languages': [
        'Украинский',
        'Английский',
        'Польский',
        'Русский'
      ],
      'citizenship': 'Ukraine',
      'phoneNumber': '+48000000001',
      'numberOfAdults': 1,
      'numberOfChildren': 1,
      'animals': true,
      'currentLocation': 'Przemysl',
      'destinationLocation': 'Warsaw',
      'needs': [
        'Помощь с транспортом', 'Помощь с размещением'
      ],
      'description': 'lorem ipsum',
      'createdAt': '2022-03-07T12:00:00Z',
      'updatedAt': '2022-03-06T10:07:32.168114Z'
    }
  ]

  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState([
    {title: 'With kids', value: 'numberOfChildren', isActive: false},
    {title: 'Transport', value: 'transport', isActive: false},
    {title: 'Accomodation', value: 'accomodation', isActive: false}
  ])
  const [applicationsList, setApplicationList] = useState([])
  let filterApplicationList = [...applicationsList]
  filters.forEach(filter => {
    if (filter.isActive) {
      filterApplicationList = filterApplicationList.filter(application => application[filter.value])
    }
  })
  const [sortedApplicationList, setSortedApplicationList] = useState([...filterApplicationList])

  useEffect(() => {
    setSortedApplicationList([...filterApplicationList])
  }, [applicationsList])
  useEffect(() => {
    setSortedApplicationList([...filterApplicationList])
  }, [filters])
  useEffect(() => {
    setSortedApplicationList(filterApplicationList.filter(application => {
      return application.fullName.toLowerCase().includes(searchValue.toLowerCase())
    }))
  }, [searchValue])
  useEffect(() => {
    fetchData()
  }, [])

  function changeFilterHandler(value) {
    setFilters(filters.map(filter => {
        return filter.value === value
          ? {...filter, isActive: !filter.isActive}
          : filter
      }
    ))
  }

  function fetchData(url, params) {
    setIsLoading(true)
    // axios.get(url, {
    //   method: 'GET',
    //   params
    // }).then(response => {
    //   try {
    //     applicationsList = response.data.map(fetchApplication => {
    //       return {
    //         ...fetchApplication,
    //         transport: fetchApplication.needs.includes('Помощь с транспортом'),
    //         accomodation: fetchApplication.needs.includes('Помощь с размещением')
    //       }
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // })

    setTimeout(() => {
      const newApplicationsList = fetchApplicationsList.map(fetchApplication => {
        return {
          ...fetchApplication,
          transport: fetchApplication.needs.includes('Помощь с транспортом'),
          accomodation: fetchApplication.needs.includes('Помощь с размещением')
        }
      })
      setApplicationList([...newApplicationsList])
      setIsLoading(false)
    }, 3000)
  }

  function changePageHandler(page) {
    const params = {
      page: page,
      take: 20,
    }
    fetchData('url', params)
  }

  return (
    <div className="applications">

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header/>

      <section className="applications__sub-header">
        <div className="applications__title-box wrapper">
          <h1 className="applications__title">Applications list</h1>
          <form className="applications__form">
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
            {filters.map(filter => {
              return (
                <li className="applications-filter__item" key={filter.value}>
                  <button
                    className={filter.isActive
                      ? 'applications-filter__button applications-filter__button_active'
                      : 'applications-filter__button'}
                    onClick={() => changeFilterHandler(filter.value)}
                  >{filter.title}</button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="applications-list">
          <div className="wrapper">
            <CustomPaginationActionsTable sortedApplicationList={sortedApplicationList} isLoading={isLoading}/>
            <Pagination className="pagination"
                        onChange={(event, value) => console.log(event, value)}
                        count={Math.ceil(sortedApplicationList.length / 20)}
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

export default MainPage