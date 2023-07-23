enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
}

enum HttpMethod {
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    PUT = 'PUT',
    POST = 'POST',
}

enum CarStatus {
    STOP = 'stopped',
    START = 'started',
    DRIVE = 'drive',
}

enum SortBy {
    Time = 'time',
    Wins = 'wins',
}

enum SortOrder {
    Asc = 'asc',
    Desc = 'desc',
}

enum View {
    Garage = 'garage',
    Winners = 'winners',
}

export { HttpStatus, HttpMethod, SortBy, SortOrder, View, CarStatus };
