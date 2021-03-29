/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import './PokeFetch.css';

class PokeFetch extends Component {
  constructor() {
    super();
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: 10,
    };
  }
  countDown = () => {
    this.myInterval = setInterval(() => {
      const { time } = this.state;

      if (time === 0) {
        clearInterval(this.myInterval);
      } else {
        this.setState(({ time }) => ({
          time: time - 1,
        }));
      }
    }, 1000);
  };

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          time: 10,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button
          className={'start'}
          onClick={() => {
            this.fetchPokemon();
            this.countDown();
          }}
        >
          Start!
        </button>
        <h1 className={'timer'}>{this.state.time}</h1>
        <div className={'pokeWrap'}>
          <img
            className={'pokeImg'}
            src={this.state.pokeSprite}
            className={this.state.time > 0 ? 'darken' : null}
            alt=''
          />
          {this.state.time === 0 ? (
            <h1 className={'pokeName'}>{this.state.pokeName}</h1>
          ) : null}
        </div>
      </div>
    );
  }
}

export default PokeFetch;
