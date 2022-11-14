import { useState } from "react";
import styled from "styled-components";

const InternalUseSection = styled.section`
  display: flex;
  justify-content: center;
  height: 100%;

  .table-container {
    background: white;
    border-radius: 20px;
    max-width: 1200px;
    width: 100%;
    box-shadow: 0 20px 38px rgba(0, 0, 0, 0.05), 0 15px 50px rgba(0, 0, 0, 0.05);
  }

  table {
    border-radius: 20px;
    font-size: 14px;
  }

  th {
    border-bottom: solid 1px #e9e9e9;
    padding: 20px;
    text-align: left;
    span {
      position: relative;
      cursor: pointer;
    }
    i {
      position: absolute;
      margin-left: 8px;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
    padding: 40px;
  }

  tbody tr td {
    padding: 20px;
  }

  table tr:nth-child(even) {
    background: #fafafa;
    padding: 20px;
  }

  .refine-results {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .form-group {
      width: 35%;
    }
    .clear-data {
      text-align: left;
      display: flex;
      justify-content: flex-end;
      button {
        border-radius: 8px;
        appearance: none;
        border: none;
        height: 50px;
        width: 187px;
        background: #333;
        color: white;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
      }
    }
    input {
      padding: 0px 12px;
      width: 100%;
      appearance: none;
      height: 50px;
      font-size: 16px;
      background: none;
      border: solid 1px #e9e9e9;
      border-radius: 12px;
    }
  }
`;

const DataTable = ({ queryData, clearData }) => {
  const [sortingMetric, setSortingMetric] = useState("title");
  const [sortByAsc, setSortByAsc] = useState(true);
  const [userSearchInput, setUserSearchInput] = useState("");

  const handleTableSorting = (metric) => {
    if (metric === sortingMetric) {
      setSortByAsc(!sortByAsc);
    } else {
      setSortByAsc(true);
    }
    setSortingMetric(metric);
    getSortedQueryData();
  };

  const getSortedQueryData = (e) => {
    if (sortingMetric === "title") {
      if (sortByAsc) {
        queryData.sort((a, b) => a.Title.localeCompare(b.Title));
      } else {
        queryData.sort((a, b) => b.Title.localeCompare(a.Title));
      }
    }
    if (sortingMetric === "date") {
      if (sortByAsc) {
        queryData.sort((a, b) => a.BreachDate.localeCompare(b.BreachDate));
      } else {
        queryData.sort((a, b) => b.BreachDate.localeCompare(a.BreachDate));
      }
    }
    if (sortingMetric === "domain") {
      if (sortByAsc) {
        queryData.sort((a, b) => a.Domain.localeCompare(b.Domain));
      } else {
        queryData.sort((a, b) => b.Domain.localeCompare(a.Domain));
      }
    }
    if (sortingMetric === "count") {
      if (sortByAsc) {
        queryData.sort((a, b) => b.PwnCount - a.PwnCount);
      } else {
        queryData.sort((a, b) => a.PwnCount - b.PwnCount);
      }
    }
    return queryData;
  };

  const caretAscDesc = () => {
    return sortByAsc ? "fa fa-caret-up" : "fa fa-caret-down";
  };

  const handleTableSearch = (e) => {
    setUserSearchInput(e.target.value);
  };

  const handleClearDataBtn = () => {
    setSortingMetric("");
    setSortByAsc(true);
    setUserSearchInput("");
    clearData();
  };

  return (
    <InternalUseSection>
      <div className="table-container">
        <section className="refine-results">
          <div className="form-group user-search">
            <input
              onChange={(e) => handleTableSearch(e)}
              type="search"
              placeholder="search..."
              value={userSearchInput}
            />
          </div>
          <div className="form-group clear-data">
            <button onClick={handleClearDataBtn}>Clear Data</button>
          </div>
        </section>
        <table>
          <thead>
            <tr>
              <th>
                <span onClick={() => handleTableSorting("title")}>
                  Title
                  {sortingMetric === "title" && (
                    <i className={caretAscDesc()}></i>
                  )}
                </span>
              </th>
              <th>
                <span onClick={() => handleTableSorting("date")}>
                  Breach Date
                  {sortingMetric === "date" && (
                    <i className={caretAscDesc()}></i>
                  )}
                </span>
              </th>
              <th>
                <span onClick={() => handleTableSorting("domain")}>
                  Domain
                  {sortingMetric === "domain" && (
                    <i className={caretAscDesc()}></i>
                  )}
                </span>
              </th>
              <th>
                <span onClick={() => handleTableSorting("count")}>
                  PwnCount
                  {sortingMetric === "count" && (
                    <i className={caretAscDesc()}></i>
                  )}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {queryData.length >= 1 &&
              getSortedQueryData()
                .filter(
                  (x) =>
                    x.Title.toLowerCase().includes(userSearchInput) ||
                    x.BreachDate.includes(userSearchInput) ||
                    x.Domain.includes(userSearchInput) ||
                    x.PwnCount.toString().includes(userSearchInput)
                )
                .map((breachData) => {
                  return (
                    <tr key={breachData.Title}>
                      <td>{breachData.Title}</td>
                      <td>{breachData.BreachDate}</td>
                      <td>{breachData.Domain}</td>
                      <td>{breachData.PwnCount}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </InternalUseSection>
  );
};

export default DataTable;
