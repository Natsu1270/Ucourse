import moment from 'moment'

const currentYear = moment().year()
const nextYear = moment().year() + 1

export const dataByMonth = (dataset, key) => {
    const outData = {}
    if (dataset) {
        outData['jan'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-02-01`))
        outData['feb'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-03-01`))
        outData['mar'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-04-01`))
        outData['apr'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-05-01`))
        outData['may'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-06-01`))
        outData['jun'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-07-01`))
        outData['jul'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-08-01`))
        outData['aug'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-09-01`))
        outData['sep'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-10-01`))
        outData['oct'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-11-01`))
        outData['nov'] = dataset.filter(item => moment(item[key]).isBefore(`${currentYear}-12-01`))
        outData['dec'] = dataset.filter(item => moment(item[key]).isBefore(`${nextYear}-01-01`))

        return outData
    }
}

export const lineChartDataByMonth = (dataset, type) => {
    if (dataset) {
        return [
            {
                month: "Jan",
                type: type,
                count: dataset['jan'].length
            },

            {
                month: "Feb",
                type: type,
                count: dataset['feb'].length
            },

            {
                month: "Mar",
                type: type,
                count: dataset['mar'].length
            },

            {
                month: "Apr",
                type: type,
                count: dataset['apr'].length
            },

            {
                month: "May",
                type: type,
                count: dataset['may'].length
            },

            {
                month: "Jun",
                type: type,
                count: dataset['jun'].length
            },

            {
                month: "Jul",
                type: type,
                count: dataset['jul'].length
            },

            {
                month: "Aug",
                type: type,
                count: dataset['aug'].length
            },

            {
                month: "Sep",
                type: type,
                count: dataset['sep'].length
            },

            {
                month: "Oct",
                type: type,
                count: dataset['oct'].length
            },
            {
                month: "Nov",
                type: type,
                count: dataset['nov'].length
            },
            {
                month: "Dec",
                type: type,
                count: dataset['dec'].length
            },

        ];
    }
}