import slugify from 'slugify';
import moment from 'moment';
import parse from 'html-react-parser'

export function slugifyString(str) {
    return slugify(str, {
        lower: true
    })
};

export function formatDate(date,pattern) {
    return moment(date).format(pattern);
}

export function parseHtml(content) {
    return parse(content)
}

