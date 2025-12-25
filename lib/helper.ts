import { faker } from '@faker-js/faker';

export function generateUsername() {
    const adjective = faker.word.adjective();
    const noun = faker.word.noun();

    const suffix = Math.floor(Math.random() * 10000);

    return `${capitalize(adjective)}${capitalize(noun)}${suffix}`;
}

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function normalizeDate(date: string | Date | number) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 0) return 'just now';
    if (diffInSeconds < 60) return `${diffInSeconds} sec`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hr`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} month`;

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year ago`;
}
