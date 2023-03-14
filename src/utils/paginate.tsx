import _ from 'lodash-es'

// function that paginate array of data
export function Paginate<T>(arrayItems: T[] , pageNumber: number, pageSize: number) {
    const startIndex = (pageNumber -1) * pageSize;

    // returns a lodash object
    return _.chain(arrayItems).slice(startIndex).take(pageSize).value()
}

