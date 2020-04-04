import slugify from "slugify";

export function slugifyString(str) {
    return slugify(str, {
        lower: true
    })
};