# Book API Spec

## Create book

Endpoint : POST /api/books

Request Body :

```json
{
  "judul": "atomic habits",
  "penulis": "James Clear",
  "harga": "80.000",
  "stok": 100
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "judul": "atomic habits",
    "penulis": "James Clear",
    "harga": "80.000",
    "stok": 100
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Judul must not blank, ..."
}
```

## Get book

Endpoint : GET /api/books/:id

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "judul": "atomic habits",
    "penulis": "James Clear",
    "harga": "80.000",
    "stok": 100
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "book is not found, ..."
}
```

## Update book

Endpoint : PUT /api/books/:id

Request Body :

```json
{
  "judul": "atomic habits",
  "penulis": "James Clear",
  "harga": "80.000",
  "stok": 100
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "judul": "atomic habits",
    "penulis": "James Clear",
    "harga": "80.000",
    "stok": 100
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "book must not blank, ..."
}
```

## Remove book

Endpoint : DELETE /api/books/:id

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "book is not found, ..."
}
```

## List book

Endpoint : GET /api/books

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "judul": "atomic habits",
      "penulis": "James Clear",
      "harga": "80.000",
      "stok": 100
    },
    {
      "id": 2,
      "judul": "poor dad rich dad",
      "penulis": "Robert Kiyosaki and Sharon Lechter",
      "harga": "50.000",
      "stok": 50
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "errors": "Server"
}
```
