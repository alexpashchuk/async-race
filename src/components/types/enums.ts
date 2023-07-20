enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
}

enum STATUS {
    ID = 'id',
    STATUS = 'status',
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

export { HttpStatus, STATUS, SortBy, SortOrder };
