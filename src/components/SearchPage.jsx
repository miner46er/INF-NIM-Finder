import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import axios from "axios";
import qs from "qs";
import "../styles/SearchPage.css";

function SearchBar(props) {
  return(
    <div className="SearchBar">
      <form onSubmit={props.handleSubmit}>
        <InputGroup>
          <FormControl
            id="searchField"
            autoFocus
            placeholder="Nama atau NIM"
            onChange={props.handleChange}
          />
          <InputGroup.Append>
            <Button type="submit" variant="dark">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
    </div>
  );
}

function SearchNavigation(props) {
  return(
    <div className="SearchNavigation">
      <Button
        disabled={props.page <= 0}
        onClick={() => props.changePage(props.page-1)}
        variant="dark"
      >
        &#8249; Previous
      </Button>
      <p>
        Page: {props.page}
      </p>
      <Button
        disabled={props.pageEntryCount === 0}
        onClick={() => props.changePage(props.page+1)}
        variant="dark"
      >
        Next &#8250;
      </Button>
    </div>
  );
}

function SearchResults(props) {
  if (props.listMahasiswa === null ||
    props.listMahasiswa === undefined ||
    props.listMahasiswa.length === 0) {
    return <h2 id="NoResult">No Result</h2>;
  }

  const tableMahasiswa = props.listMahasiswa.map(
    (mahasiswa) => 
      <tr key={mahasiswa.nim_tpb}>
        <td>{mahasiswa.name}</td>
        <td>{mahasiswa.nim_tpb}</td>
        <td>{mahasiswa.nim_jur}</td>
        <td>{mahasiswa.prodi}</td>
      </tr>
  );

  return(
    <div className="SearchResults">
      <h3>Query: {props.lastQuery}</h3>
      <Table responsive>
        <thead>
          <tr>
            <th>Nama</th>
            <th>NIM TPB</th>
            <th>NIM Jurusan</th>
            <th>Prodi</th>
          </tr>
        </thead>
        <tbody>
          {tableMahasiswa}
        </tbody>
      </Table>
    </div>
  );
}

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      haveSearched: false,
      searchField: "",
      resultCountPerPage: 10,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  changePage(newPage) {
    this.setState(
      { page: newPage },
      () => this.sendQuery()
    );
  }

  sendQuery() {

    // check whether the search field contains only alphanumeric or not
    const isQueryName = isNaN(this.state.searchField) ? true : false;

    const params = {
      ...(isQueryName ?
          {name: this.state.searchField} :
          {query: this.state.searchField}),
      page: this.state.page,
      count: this.state.resultCountPerPage
    };

    const queryUrl = "https://api.stya.net/nim/"
                      + (isQueryName ? "byname" : "byid")
                      + "?"
                      + qs.stringify(params);
    
    const options = {
      method: "GET",
      url: queryUrl,
      headers: { 'Auth-Token': this.props.token },
    };

    axios(options)
      .then(res => this.setState({
        listMahasiswa: res.data.payload,
        lastQuery: res.data.query,
        haveSearched: true
      }));
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState(
      { page: 0 },
      () => this.sendQuery()
    );
  }

  render() {
    return(
      <div className="SearchPage">
        <SearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {
          this.state.haveSearched ?
          <div>
            <SearchResults
              listMahasiswa={this.state.listMahasiswa}
              lastQuery={this.state.lastQuery}
            />
            <SearchNavigation
              page={this.state.page}
              changePage={this.changePage}
              pageEntryCount={this.state.listMahasiswa.length}
            />
          </div> :
          null
        }
      </div>
    );
  }
}