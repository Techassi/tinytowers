# Tiny Towers

Final submission for PRIMA WS20

Eine spielbare Version befindet sich [hier](https://techassi.github.io/tinytowers/)

Der Quellcode befindet sich [hier](https://github.com/Techassi/tinytowers/tree/master/src)

Informationen zum Game Design befinden sich in der README weiter [unten](https://github.com/Techassi/tinytowers#game-design)

## Tools

The tooling uses the standard npm / yarn tooling with dependency management via the `package.json` file. The following
scripts are registered:

-   `dev`: Build the source for development
-   `build`: Build the source for production
-   `watch`: Build the source for development while watching for file changes

### Linting

For code linting I use `eslint` with the additional `@typescript-eslint` plugin / parser. Note: `tslint` was deprecated
in 2019. Configuration is done via `.eslintrc.js` and `.eslintignore`. I use the following linting rules:

-   `eslint:recommended`
-   `plugin:@typescript-eslint/recommended`
-   `prettier`
-   `prettier/@typescript-eslint`

### Formatting

For code formatting I use `prettier`. Configuration is done via the `.prettierrc` file.

### Building

I use rollup (with various plugins) for building the source for either development or production. Configuration is done
via `rollup.config.dev.js` and `rollup.config.prod.js` which both respect the `tsconfig.json` file.

## Build from source

To build from source first install all dependencies via `yarn / yarn install`. Then either choose the production or
development build via the above mentioned scripts.

## Game Design

TinyTowers is a simple turret / tower defense game. It follows the classical approach with multiple waves (which can
contain multiple steps). When one or more enemies reach the "base" of the player, it takes damage. When the base health
drops to zero or below, the player loses. The user can defend his base against the enemies by building turrets which
shot and kill the enemies. When he survives all waves and his base has still more than zero health the player wins.

Before starting the game the user has to click the "Start Game" button, which then generates the level and immediatly
starts the first wave. The player start with 20 money, 0 score and 100 health points.

For each shot enemy the player gets rewarded with some money and the score updates. The score gets calculated how early
the enemy was killed. The earlier - the higher score.

|  Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                                                                                                         |
| --: | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Titel                 | TinyTowers                                                                                                                                                                                                                                                                                                                                                     |
|     | Name                  | Sascha Lautenschläger                                                                                                                                                                                                                                                                                                                                          |
|     | Matrikelnummer        | 257287                                                                                                                                                                                                                                                                                                                                                         |
|   1 | Nutzerinteraktion     | The user manipulates the game with his mouse. Selecting and placing towers is done with the left mouse button. Pressing ESC will cancel the purchase of a tower before placing it.                                                                                                                                                                             |
|   2 | Objektinteraktion     | The bullets and the opponents collide with each other. This checks how much damage the opponent takes and whether he dies.                                                                                                                                                                                                                                     |
|   3 | Objektanzahl variabel | The opponents are generated dynamically during runtime based on the level / wave configuration. Placed turrets are also created automatically.                                                                                                                                                                                                                 |
|   4 | Szenenhierarchie      | The scene hierarchy is structured as follows: <br/> Level<br/> - HUD <br/> -- Money display <br/> -- Score display <br/> -- Health display <br/> - Shop <br/> -- Automatically generated turret buttons <br/> - Gridmap <br/> -- Cells <br/> -- Path                                                                                                           |
|   5 | Sound                 | The following actions are currently supported with sound: <br/> - Attempting to place a Turret on the path <br/> - Canceling the purchase of a turret with ESC <br/> - The shot of a turret <br/> - The start of a new wave <br/> - Taking damage when the enemies reach the base <br/> - The end of the game (Won or Lost different) <br/> - Background music |
|   6 | GUI                   | Via the HUD the user can see the current values of score, money and health points. He can buy and place turrets via the shop in the lower third of the game.                                                                                                                                                                                                   |
|   7 | Externe Daten         | The config gets loaded via a URL (a config JSON file) when the game starts (All data is customizable).                                                                                                                                                                                                                                                         |
|   8 | Verhaltensklassen     | All important components are defined as classes.                                                                                                                                                                                                                                                                                                               |
|   9 | Subklassen            | Various classes extend predefined classes of the Phaser game engine.                                                                                                                                                                                                                                                                                           |
|  10 | Maße & Positionen     | A cell is 50 x 50 pixels in size. Turrets are 40 x 40, opponents are 20 x 20, and bullets are 10 x 10 pixels.                                                                                                                                                                                                                                                  |
|  11 | Event-System          | Various events are exchanged via a dedicated event bus.                                                                                                                                                                                                                                                                                                        |

## Components in detail

### Controllers

See [here](https://github.com/Techassi/tinytowers/tree/master/src/controller)

The main controller reacts to game level events, such as winning or losing. There are two sub controllers: the `Turret`
and `Wave` controller.

The `Turret controller` is responsible for placing turrets at the provided positions and keeps track of already placed
turrets.

The `Wave controller` is responsible for managing the different waves, their steps and the enemy spawning per step. It
does this via multiple `tickers` which tightly control the wave, step and enemy timings. It also keeps track of
remaining enemies and enemies in range of turrets.

### Store

See [here](https://github.com/Techassi/tinytowers/tree/master/src/store)

The store holds global data and can be accessed from multiple components. The store provides typed getters and setters,
aswell as methods to subscribe to mutations, which allows e.g. the HUD to update its values automatically.

### Event bus

See [here](https://github.com/Techassi/tinytowers/tree/master/src/bus)

The bus allows multiple components to exchange events and additional payloads. The bus gets primarily used by objects
like turrets or enemies to indicate some events back to the controllers.

### Gridmap

See [here](https://github.com/Techassi/tinytowers/tree/master/src/gridmap)

The gridmap is responsible for cell layout and enemy path generation.

## Asset sources

All images are created by me (Simple, but enough).

All sound assets are taken from [here](https://freesound.org/). You can download these for free when you have an
account.
