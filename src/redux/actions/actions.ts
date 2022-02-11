import {actionType} from './action-types'
import axios from 'axios';
import * as actionTypes from './creators'

interface HomePageAppears {
    type: actionType.HOMEPAGE
}

interface BreedsAppears {
    type: actionType.BREEDS,
}

interface AtomicBreedAppears {
    type: actionType.ATOMICBREED,
}

export type Action = HomePageAppears | BreedsAppears | AtomicBreedAppears;