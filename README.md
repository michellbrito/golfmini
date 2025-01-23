
# GolfMini

A directory of mini-golf courses where users can search 
| <img src="https://github.com/user-attachments/assets/fed9142b-049a-4ea0-b693-58defbebf1eb" height="800px"/>  | <img src="https://github.com/user-attachments/assets/fed9142b-049a-4ea0-b693-58defbebf1eb" height="800px"/>  |
|:-:|:-:|




## Features

- [ ] Search by location
- [ ] View photos

## Tech Stack

**Client:** React, Chakra UI

**Server:** Node, Express, Prisma


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


