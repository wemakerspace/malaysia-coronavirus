
# Coronavirus (COVID-19) in Malaysia

Source code for the (unofficial) [Malaysia's Coronavirus Dashboard](https://malaysia-coronavirus.web.app). This project is not affiliated with Malaysia's government.


![Screenshot of the Malaysia's Coronavirus Dashboard](https://i.imgur.com/GfUX8E6.png)
  

## Technologies

- Vue 3, Tailwind CSS

- Firebase (Realtime Database, Hosting, Cloud Functions, Storage)

  

## Quick Start

1. Clone this repository
```bash

git clone https://github.com/limhenry/malaysia-coronavirus.git

cd malaysia-coronavirus

```

2. Frontend: Install the npm packages
```bash

npm install

```
3. Frontend: Run the app
```bash

npm run dev

```

4. Functions: Install the npm packages
```bash

cd functions
npm install

```

5. Functions: Run Cloud Functions locally
```bash

firebase serve --only functions

```

## Data Source
 - [COVID-19 Immunisation Task Force's GitHub](https://github.com/CITF-Malaysia/citf-public)
 -  [Ministry of Health Malaysia's GitHub](https://github.com/MoH-Malaysia/covid19-public/tree/main/epidemic)

## License
The project is published under the [MIT license](https://github.com/limhenry/malaysia-coronavirus/blob/master/LICENSE).

## Credits

This project is based on the [UK's Coronavirus Dashboard](https://coronavirus.data.gov.uk).