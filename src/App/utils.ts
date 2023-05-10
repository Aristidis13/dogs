import { pages } from "../constants";
import { apiUrls } from '../constants';
import { TAction, TRedirectionObject } from './@types';

export const onRedirection = (state:TRedirectionObject,action:TAction) => {
    switch (action.type) {
        case pages.home:
            return { pageUrl: pages.home, apiUrl: apiUrls.randomDogs+action.payload.numOfDogs };
        case pages.breeds:
            return { pageUrl: pages.breeds, apiUrls: [apiUrls.randomDogs] };
        case pages.home:
            return { pageUrl: pages.home, apiUrls: [apiUrls.randomDogs] };
        case pages.home:
            return { pageUrl: pages.home, apiUrls: [apiUrls.randomDogs] };
        case pages.home:
            return { pageUrl: pages.home, apiUrls:[ apiUrls.randomDogs] };
    }
}