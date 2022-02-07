# Pokemon Trainer

[Live Demo](https://at-pokemon-trainer.herokuapp.com) (Hosted on _Heroku_)

[REST API](https://at-assignment-api.herokuapp.com/trainers) (Hosted on _Heroku_)

[Component Tree Picture](docs/ct-pokemon-trainer.png)

## Table of Contents

- [General Information](#general-information)

- [Technologies and Resources](#technologies-and-resources)

- [Installation and Usage](#installation-and-usage)

- [Contributors](#contributors)

## General Information

**Login view**

```NOTE: User cannot see this view IF logged in```

The login view is the initial view the user will see when trying to access the application. It includes a singular input form field for an username and a login button. Due to the scope of the project and ease of use, the form acts as both a login form for existing users and a register form for new users. Upon submitting the form, the app will check if the username corresponds to an existing user in the API and proceeds to either log that user in or create a new user with the given username and an empty collection of Pokemon. The API is a simple JSON Server app deployed on Heroku, so it'll reset after a period of inactivity resulting in the user data being lost. After logging in, a route guard prevents the user from accessing the login view again until they log out.

**Catalogue view**

```NOTE: User cannot see this view IF NOT logged in```

The catalogue view is the main view of the application and it can only be accessed while being logged in. It displays a list of Pokemon (#1 - #151) including their names and sprites. Each element also has "+" button that allows the user to "catch" the Pokemon which adds it to their own collection both in the application and the API. The personal collection can be inspected in the trainer view. After adding a Pokemon to the collection, the "+" button will be disabled to prevent adding the same Pokemon to the collection multiple times. Adding a Pokemon to the user's collection will also add a small poke ball symbol next to the sprite to indicate it has been "caught". The Pokemon names and ids are fetched from the free PokéAPI upon the first rendering the view. The data is then stored in the browser's session storage to prevent extra API requests during rerenders. If the user navigates to the trainer view, they can go back to the catalogue view by clicking the "Pokemon Trainer" logo on the navbar.

**Trainer view**

```NOTE: User cannot see this view IF NOT logged in```

To access the trainer view, the user can click the profile icon on the right side of the navbar. It is only accessible if the user is currently logged in. The trainer view displays the username of the user that is currently logged in, along with their personal collection of Pokemon that have been stored in the API. In this view each Pokemon has an 'x' button beneath them. Clicking the button will remove that specific Pokemon from the user's collection in both the application and the API.

## Technologies and Resources

The project is implemented using the following technologies and resources:

- Angular
- Bootstrap
- [PokéAPI](https://pokeapi.co/)
- [PokéAPI Sprites](https://github.com/PokeAPI/sprites)

## Installation and Usage

**NOTE:** You will need _node_ and _npm_ installed on your machine

1. Clone the project repository:

```sh
git clone https://github.com/arttuhar/pokemon-trainer.git
```

2. Install the dependencies while inside the project directory:

```sh
npm install
```

3. Start the server:

```sh
ng serve
```

After starting the server, you can access the application by navigating to `localhost:4200` on your browser.

## Contributors

[Arttu Hartikainen (@arttuhar)](https://github.com/arttuhar)

[Timo Järvenpää (@TimoJarvenpaa)](https://github.com/TimoJarvenpaa)
