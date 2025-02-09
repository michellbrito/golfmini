
# GolfMini

A directory of mini-golf courses where users can search 

<img src="https://github.com/user-attachments/assets/fed9142b-049a-4ea0-b693-58defbebf1eb" height="800px"/>

## Features

- [ ] Search by location
- [ ] View photos

## Tech Stack

**Client:** React, Next.js, Chakra UI

**Server:** Node, Express, Prisma

**DB:** MYSQL

## Run Locally

Clone the project

```bash
  git clone git@github.com:michellbrito/golfmini.git
```

Go to the project directory

```bash
  cd golfmini
```

Install dependencies

```bash
  npm run client:install
  npm run server:install
```

Start the server

```bash
  npm run server:start
```

Start the client

```bash
  npm run client:dev
```

## API Reference

#### Gets all mini golf locations - `/locations`

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | The type of the location such as indoor, and outdoor |
| `theme` | `string` | The theme of the location such as castle, glow in the dark, pirate, and jungle |
| `state` | `string` | State within USA |
| `city` | `string` | City within USA |
| `page` | `int` | The paginated page results should be fetched from |
| `limit` | `int` | The maximum number of locations should be returned |


#### Gets a specific location - `/locations/:id`

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` |The id of a specific location |

## Environment Variables

To run this project, you will need to create 2 .env files 1 within client and 1 within server

### Client Environment Variables 
`NEXT_PUBLIC_API_URL`

### Server Environment Variables 
`DATABASE_URL`

`CLIENT_URL`



