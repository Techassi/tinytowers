# Tiny Towers

Final submission for PRIMA WS20

| Bezeichnung    | Inhalt                |
| -------------- | --------------------- |
| Titel          | TinyTowers            |
| Name           | Sascha Lautenschläger |
| Matrikelnummer | 257287                |

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

### Checkliste

-   `Nutzerinteraktion`: Der Nutzer agiert mit dem Spiel mit seiner Maus. Das Auswählen und Platzieren von Türmen erfolgt mit der linken Maustaste.
-   `Objektinteraktion`: Die Bullets und die Gegner kollidieren mit einander. Dabei wird überprüft wieviel Schaden der Gegner nimmt und ob er stirbt.
-   `Objektanzahl variabel`: Die Gegner werden dynamisch während der Laufzeit basierend auf der Level / Wave Konfiguration generiert. Platzierte Turrets werden auch automatisch erstellt.
-   `Szenenhierarchie`: Die Szenenhierarchie ist wie folgt aufgebaut:

```
Level
  > HUD
    > Money Anzeige
    > Score Anzeige
    > Health Anzeige
  > Shop
    > Automatisch generierte Turret Buttons
  > Gridmap
    > Cells
    > Path
```

-   `Sound`: Folgende Aktionen werden zur Zeit mit Sound unterstützt:
    -   Der Versuch einen Turret auf den Pfad zu setzen
    -   Das Abbrechen des Kaufs eines Turrets mit ESC
    -   Der Schuss eines Turrets
    -   Der Beginn einer neuen Wave
    -   Schaden nehmen, wenn die Gegner die Basis erreichen
    -   Das Ende des Spiels (Gewonnen oder Verloren unterschiedlich)
    -   Hintergrundmusik
-   `GUI`: Über das HUD kann der Nutzer aktuelle Werte zu Score, Geld und Lebenspunkte einsehen. Über den Shop kann er Turrets kaufen und platzieren.
-   `Externe Daten`: Nicht implementiert, aber möglich (Alle Daten sind anpassbar).
-   `Verhaltensklassen`: Alle wichtigen Komponenten sind als Klassen definiert.
-   `Subklassen`: Diverse Klassen extenden vorgegebene Klassen von Phaser.
-   `Maße & Positionen`: Eine Zelle ist 50 x 50 Pixel groß. Die Turrets sind 40 x 40, Gegner 20 x 20 und Bullets 10 x 10 Pixel groß.
-   `Event-System`: Es werden diverse Events über einen eigenen Event Bus ausgetauscht.
