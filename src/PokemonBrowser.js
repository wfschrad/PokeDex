import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { imageUrl } from './config';
import LogoutButton from './LogoutButton';
import PokemonDetail from './PokemonDetail';
import PokemonForm from './PokemonForm';
import Fab from './Fab';
import getPokemon from './store/pokemon'

class PokemonBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  handleCreated = (pokemon) => {
    this.setState({
      showForm: false,
    });
    this.props.handleCreated(pokemon)
  }

  showForm = () => {
    this.setState({
      showForm: true,
    })
  }

  componentDidMount() {
    this.props.getPokemon();
  }

  render() {
    const pokemonId = Number.parseInt(this.props.match.params.pokemonId);
    if (!this.props.pokeList) {
      return null;
    }
    return (
      <main>
        <LogoutButton token={this.props.token} />
        <nav>
          <Fab hidden={this.state.showForm} onClick={this.showForm} />
          {this.props.pokeList.map(pokemon => {
            return (
              <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
                <div className={pokemonId === pokemon.id ? 'nav-entry is-selected' : 'nav-entry'}>
                  <div className="nav-entry-image"
                    style={{ backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')` }}>
                  </div>
                  <div>
                    <div className="primary-text">{pokemon.name}</div>
                    <div className="secondary-text">Born {new Date(pokemon.updatedAt).toDateString()}</div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </nav>
        {this.state.showForm ?
          <PokemonForm token={this.props.token} handleCreated={this.handleCreated} /> :
          <Route path="/pokemon/:id" render={props =>
            <PokemonDetail {...props} token={this.props.token} />
          } />
        }
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemon: state.pokeList
});

const mapDispatchToProps = (dispatch) => ({
  getPokemon: () => dispatch(getPokemon)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  PokemonBrowser
);
// export default PokemonBrowser;
