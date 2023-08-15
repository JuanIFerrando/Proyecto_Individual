import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities, filterByActivity, resetPage } from "../../redux/actions";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const PAGE_SIZE = 10; 

const CardsContainer = ({ searchInput }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const [currentPage, setCurrentPage] = useState(1);
  const [continentFilter, setContinentFilter] = useState('');
  const [sortType, setSortType] = useState('alphabetical');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const handleActivityFilter = (e) => {
    dispatch(resetPage());
    dispatch(filterByActivity(e.target.value));
  };

  const handleSortTypeChange = (e) => {
    const newSortType = e.target.value;
    const [sortCriteria, sortDirection] = newSortType.split('_');
  
    if (sortCriteria !== sortType) {
      setSortDirection('asc');
    } else {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    }
    setSortType(sortCriteria);
  };
  
  
  
  const filteredAndSortedCountries = countries
    .filter((country) =>
      country.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .filter((country) =>
      continentFilter ? country.continent === continentFilter : true
    )
    .sort((a, b) => {
      if (sortType === 'alphabetical') {
        const compareResult = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? compareResult : -compareResult;
      } else if (sortType === 'population') {
        return sortDirection === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      }
      return 0;
    })
    .slice(startIndex, endIndex);
   
  const totalPages = Math.ceil(filteredAndSortedCountries.length / PAGE_SIZE);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={style.container}>
      <div className={style.filters}>
      <h4>Filter by Continent</h4>
        <select
          value={continentFilter}
          onChange={(e) => setContinentFilter(e.target.value)}
        >
          <option value="">All Continents</option>
          <option value="Asia">Asia</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <div className={style.order_filter}>
          <h4>Filter by Activity</h4>
          <select
            name="activityFilter"
            defaultValue=""
            onChange={handleActivityFilter}
          >
            <option value="" disabled hidden>
              {" "}
              --Select--{" "}
            </option>
            <option value="All countries">All countries</option>
            {activities?.map((activity) => {
              return (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              );
            })}
          </select>
        </div>
        <h4>Sort by name</h4>
          <select name="alphabetical" defaultValue="" onChange={handleSortTypeChange}>
            <option value="" disabled hidden>
              {" "}
              --Select--
            </option>
            <option value="alphabetical_asc">Ascending</option>
            <option value="alphabetical_desc">Descending</option>
          </select>

          <h4>Sort by population</h4>
          <select name="population" defaultValue="" onChange={handleSortTypeChange}>
            <option value="" disabled hidden>
              {" "}
              --Select--
            </option>
            <option value="population_asc">Ascending</option>
            <option value="population_desc">Descending</option>
          </select>
      </div>
      <div className={style.cards}>
        {filteredAndSortedCountries.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            flagImage={country.flagImage}
            continent={country.continent}
          />
        ))}
      </div>
      <div className={style.pagination}>
        <button
          onClick={() => goToPage(currentPage - 1)}
        >
          Prev
        </button>
        <div>{`${currentPage} / ${totalPages}`}</div>
        <button
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardsContainer;

