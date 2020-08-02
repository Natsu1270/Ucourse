import slugify from 'slugify';
import moment from 'moment';
import parse from 'html-react-parser'
import Constants from "../constants";

export function slugifyString(str) {
    if (str) {
        return slugify(str, {
            lower: true
        })
    }

};

export function formatDate(date, pattern) {
    if (date) {
        return moment(date).format(pattern);
    }
}


export function parseHtml(content) {
    if (content) {
        return parse(content)
    }
}


export function secondToTime(secs) {
    return moment.utc(secs * 1000).format('HH:mm:ss')
}

export function timeDiff(timestamp) {
    if (timestamp) {
        return moment(timestamp).fromNow()
    }
}

export function dayDiff(time1, time2) {
    const t1 = moment(time1)
    const t2 = moment(time2)

    return t1.diff(t2, 'days')
}

export function isTimeBefore(timestamp) {
    return moment(timestamp).isBefore(moment())
}